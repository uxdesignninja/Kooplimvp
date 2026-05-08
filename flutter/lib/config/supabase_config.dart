import 'package:flutter/foundation.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

/// Supabase Configuration
/// Initialize Supabase client for the entire app
class SupabaseConfig {
  static Future<void> initialize() async {
    // Load from environment variables or flutter_dotenv
    const supabaseUrl = String.fromEnvironment(
      'SUPABASE_URL',
      defaultValue: 'https://your-project.supabase.co',
    );

    const supabaseAnonKey = String.fromEnvironment(
      'SUPABASE_ANON_KEY',
      defaultValue: 'your-anon-key-here',
    );

    await Supabase.initialize(
      url: supabaseUrl,
      anonKey: supabaseAnonKey,
      authOptions: const FlutterAuthClientOptions(
        authFlowType: AuthFlowType.pkce,
      ),
      realtimeClientOptions: const RealtimeClientOptions(
        logLevel: kDebugMode ? RealtimeLogLevel.info : RealtimeLogLevel.error,
      ),
    );

    if (kDebugMode) {
      print('✅ Supabase initialized');
      print('   URL: $supabaseUrl');
    }
  }

  /// Get Supabase client instance
  static SupabaseClient get client => Supabase.instance.client;

  /// Get current user
  static User? get currentUser => client.auth.currentUser;

  /// Get current user ID
  static String? get currentUserId => currentUser?.id;

  /// Check if user is authenticated
  static bool get isAuthenticated => currentUser != null;
}
