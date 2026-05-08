# Flutter Implementation Guide - Koopli Mobile App

## 📁 What Has Been Created

### ✅ Complete Files in `/flutter` Directory:

1. **Configuration**
   - `lib/config/supabase_config.dart` - Supabase client initialization

2. **Data Models**
   - `lib/models/paluwagan_group.dart` - Group model with calculations
   - `lib/models/paluwagan_member.dart` - Member model with trust score
   - `lib/models/payment_proof.dart` - Payment proof with status enum

3. **Services**
   - `lib/services/payment_service.dart` - Complete payment verification API
     - Submit payment proof
     - Get payment history
     - Admin approve/reject
     - Real-time subscriptions
     - Analytics

---

## 🔨 What Mobile Developer Needs to Build

### 1. Additional Services (Create these files)

```
lib/services/
├── auth_service.dart              # Authentication
├── group_service.dart             # Paluwagan group CRUD
├── member_service.dart            # Member management
└── notification_service.dart      # Push notifications
```

#### `auth_service.dart` Template:
```dart
import 'package:supabase_flutter/supabase_flutter.dart';
import '../config/supabase_config.dart';

class AuthService {
  final _supabase = SupabaseConfig.client;

  Future<AuthResponse> signUp({
    required String email,
    required String password,
    Map<String, dynamic>? userData,
  }) async {
    return await _supabase.auth.signUp(
      email: email,
      password: password,
      data: userData,
    );
  }

  Future<AuthResponse> signIn({
    required String email,
    required String password,
  }) async {
    return await _supabase.auth.signInWithPassword(
      email: email,
      password: password,
    );
  }

  Future<void> signOut() async {
    await _supabase.auth.signOut();
  }

  Stream<AuthState> get authStateChanges {
    return _supabase.auth.onAuthStateChange;
  }
}
```

#### `group_service.dart` Template:
```dart
import '../config/supabase_config.dart';
import '../models/paluwagan_group.dart';

class GroupService {
  final _supabase = SupabaseConfig.client;

  Future<List<PaluwagangGroup>> getUserGroups(String userId) async {
    final response = await _supabase
        .from('paluwagan_groups')
        .select('''
          *,
          paluwagan_members (
            *,
            payment_proofs (*)
          )
        ''')
        .or('admin_user_id.eq.$userId,paluwagan_members.user_id.eq.$userId');

    return (response as List)
        .map((json) => PaluwagangGroup.fromJson(json))
        .toList();
  }

  Future<PaluwagangGroup?> getGroupById(String groupId) async {
    final response = await _supabase
        .from('paluwagan_groups')
        .select('''
          *,
          paluwagan_members (
            *,
            payment_proofs (*)
          )
        ''')
        .eq('id', groupId)
        .single();

    return PaluwagangGroup.fromJson(response);
  }

  Future<PaluwagangGroup> createGroup({
    required String name,
    required double monthlyTarget,
    required int durationMonths,
    String? description,
  }) async {
    final response = await _supabase
        .from('paluwagan_groups')
        .insert({
          'name': name,
          'description': description,
          'admin_user_id': SupabaseConfig.currentUserId,
          'monthly_target_amount': monthlyTarget,
          'total_target_amount': monthlyTarget * durationMonths,
          'duration_months': durationMonths,
        })
        .select()
        .single();

    return PaluwagangGroup.fromJson(response);
  }
}
```

---

### 2. State Management (Provider)

```
lib/providers/
├── auth_provider.dart             # Auth state
├── goals_provider.dart            # Goals/groups state
└── payment_provider.dart          # Payment proofs state
```

#### `goals_provider.dart` Template:
```dart
import 'package:flutter/foundation.dart';
import '../models/paluwagan_group.dart';
import '../services/group_service.dart';

class GoalsProvider extends ChangeNotifier {
  final GroupService _groupService = GroupService();
  
  List<PaluwagangGroup> _goals = [];
  bool _isLoading = false;
  String? _error;

  List<PaluwagangGroup> get goals => _goals;
  bool get isLoading => _isLoading;
  String? get error => _error;

  Future<void> fetchUserGoals(String userId) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      _goals = await _groupService.getUserGroups(userId);
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  void addGoal(PaluwagangGroup goal) {
    _goals.add(goal);
    notifyListeners();
  }

  void updateGoal(PaluwagangGroup updatedGoal) {
    final index = _goals.indexWhere((g) => g.id == updatedGoal.id);
    if (index != -1) {
      _goals[index] = updatedGoal;
      notifyListeners();
    }
  }
}
```

---

### 3. Key Screens to Build

#### Priority Order:

1. **Authentication Screens** (Week 1)
   - `screens/auth/welcome_screen.dart`
   - `screens/auth/login_screen.dart`
   - `screens/auth/signup_screen.dart`

2. **Main Navigation** (Week 1)
   - `screens/home/home_dashboard.dart` - Bottom nav + tabs
   - Implement: Home, Goals, Budget, Profile tabs

3. **Goals/Paluwagan Screens** (Week 2)
   - `screens/goals/goals_screen.dart` - List of groups
   - `screens/goals/paluwagan_detail_screen.dart` - Group details + payment history
   - `screens/goals/submit_payment_proof_screen.dart` - Upload proof

4. **Admin Screens** (Week 3)
   - `screens/admin/admin_panel_screen.dart` - Admin dashboard
   - `screens/admin/approval_queue_screen.dart` - Review proofs

5. **Profile & Settings** (Week 3)
   - `screens/profile/profile_screen.dart`
   - `screens/profile/edit_profile_screen.dart`

---

### 4. Reusable Widgets

```
lib/widgets/
├── goal_card.dart                 # Goal card in list
├── payment_history_card.dart      # Payment history item
├── status_badge.dart              # Pending/Approved/Rejected badge
├── trust_score_badge.dart         # Trust score display
├── pending_badge.dart             # "3 pending" badge
└── custom_button.dart             # Branded button
```

#### `status_badge.dart` Example:
```dart
import 'package:flutter/material.dart';
import '../models/payment_proof.dart';

class StatusBadge extends StatelessWidget {
  final PaymentStatus status;

  const StatusBadge({Key? key, required this.status}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Color bgColor;
    Color textColor;
    String icon;
    String label;

    switch (status) {
      case PaymentStatus.approved:
        bgColor = const Color(0xFF4CAF50).withOpacity(0.1);
        textColor = const Color(0xFF4CAF50);
        icon = '✓';
        label = 'APPROVED';
        break;
      case PaymentStatus.pending:
        bgColor = const Color(0xFFFFA726).withOpacity(0.1);
        textColor = const Color(0xFFFFA726);
        icon = '⏳';
        label = 'PENDING';
        break;
      case PaymentStatus.rejected:
        bgColor = const Color(0xFFEF4444).withOpacity(0.1);
        textColor = const Color(0xFFEF4444);
        icon = '✗';
        label = 'REJECTED';
        break;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            icon,
            style: TextStyle(color: textColor, fontSize: 12),
          ),
          const SizedBox(width: 4),
          Text(
            label,
            style: TextStyle(
              color: textColor,
              fontSize: 10,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }
}
```

---

## 🚀 Quick Start Instructions

### Step 1: Set Up Flutter Project

```bash
# Create new Flutter project
flutter create koopli_mobile
cd koopli_mobile

# Copy the flutter/ directory contents to your project
cp -r flutter/lib/* lib/

# Add dependencies to pubspec.yaml
flutter pub add supabase_flutter provider image_picker intl

# Run pub get
flutter pub get
```

### Step 2: Configure Environment

Create `lib/config/env.dart`:

```dart
class Environment {
  static const String supabaseUrl = String.fromEnvironment(
    'SUPABASE_URL',
    defaultValue: 'https://your-project.supabase.co',
  );

  static const String supabaseAnonKey = String.fromEnvironment(
    'SUPABASE_ANON_KEY',
    defaultValue: 'your-anon-key',
  );
}
```

### Step 3: Initialize in main.dart

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'config/supabase_config.dart';
import 'providers/auth_provider.dart';
import 'providers/goals_provider.dart';
import 'screens/auth/welcome_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialize Supabase
  await SupabaseConfig.initialize();
  
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => GoalsProvider()),
      ],
      child: MaterialApp(
        title: 'Koopli',
        theme: ThemeData(
          primaryColor: const Color(0xFF1565C0),
          colorScheme: ColorScheme.fromSeed(
            seedColor: const Color(0xFF1565C0),
          ),
          scaffoldBackgroundColor: const Color(0xFFFAF9F7),
          useMaterial3: true,
        ),
        home: const WelcomeScreen(),
      ),
    );
  }
}
```

---

## 📋 Implementation Checklist

### Week 1: Foundation
- [ ] Set up Flutter project
- [ ] Configure Supabase
- [ ] Build auth screens (Welcome, Login, Signup)
- [ ] Implement auth provider
- [ ] Build main navigation shell

### Week 2: Core Features
- [ ] Build Goals screen (list view)
- [ ] Build Paluwagan detail screen
- [ ] Implement payment history display
- [ ] Build submit payment proof screen
- [ ] Implement image picker
- [ ] Connect to payment_service

### Week 3: Admin Features
- [ ] Build admin panel screen
- [ ] Build approval queue screen
- [ ] Implement approve/reject functionality
- [ ] Add real-time updates
- [ ] Build profile screen

### Week 4: Polish & Testing
- [ ] Add loading states
- [ ] Add error handling
- [ ] Implement pull-to-refresh
- [ ] Add animations
- [ ] Test all flows
- [ ] Fix bugs

---

## 🎨 UI Reference

Use the existing React/web app as reference for:
- Layout and spacing
- Color palette
- Typography
- Icons (lucide-react → use similar icons from Flutter packages)
- Component styling

**Key Colors:**
```dart
class AppColors {
  static const primary = Color(0xFF1565C0);
  static const success = Color(0xFF4CAF50);
  static const warning = Color(0xFFFFA726);
  static const error = Color(0xFFEF4444);
  static const background = Color(0xFFFAF9F7);
  static const textPrimary = Color(0xFF111827);
  static const textSecondary = Color(0xFF6B7280);
}
```

---

## 🔔 Real-Time Updates Implementation

### Example: Subscribe to payment proof changes

```dart
class PaluwagangDetailScreen extends StatefulWidget {
  final String groupId;
  
  const PaluwagangDetailScreen({Key? key, required this.groupId}) 
    : super(key: key);

  @override
  State<PaluwagangDetailScreen> createState() => 
    _PaluwagangDetailScreenState();
}

class _PaluwagangDetailScreenState 
    extends State<PaluwagangDetailScreen> {
  final _paymentService = PaymentService();
  RealtimeChannel? _subscription;

  @override
  void initState() {
    super.initState();
    _subscribeToUpdates();
  }

  void _subscribeToUpdates() {
    _subscription = _paymentService.subscribeToPaymentProofs(
      groupId: widget.groupId,
      onUpdate: (data) {
        // Refresh payment proofs when updated
        setState(() {
          // Update your local state
        });
      },
    );
  }

  @override
  void dispose() {
    if (_subscription != null) {
      _paymentService.unsubscribeFromPaymentProofs(_subscription!);
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Your UI here
    return Scaffold();
  }
}
```

---

## 🧪 Testing

### Unit Tests
```dart
// test/services/payment_service_test.dart
import 'package:flutter_test/flutter_test.dart';

void main() {
  group('PaymentService', () {
    test('Submit payment proof', () async {
      // Test payment proof submission
    });

    test('Approve payment proof', () async {
      // Test admin approval
    });
  });
}
```

### Widget Tests
```dart
// test/widgets/status_badge_test.dart
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('StatusBadge shows correct color for approved status',
      (WidgetTester tester) async {
    // Test status badge rendering
  });
}
```

---

## 📚 Additional Resources

- **Supabase Flutter Docs**: https://supabase.com/docs/reference/dart/introduction
- **Provider Package**: https://pub.dev/packages/provider
- **Image Picker**: https://pub.dev/packages/image_picker
- **GoRouter**: https://pub.dev/packages/go_router

---

## ✅ Definition of Done

A feature is complete when:
- [ ] Code implemented and formatted
- [ ] Connected to Supabase APIs
- [ ] Loading and error states handled
- [ ] Tested on iOS and Android
- [ ] Matches web app design
- [ ] Real-time updates working (if applicable)
- [ ] Code reviewed

---

**Ready to build! The foundation is set.** 🚀

Contact for questions about:
- Database schema → `supabase-schema.sql`
- API functions → `paymentVerification.ts`
- UI components → React components in `src/app/components/`
