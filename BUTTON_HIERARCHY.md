# Button Hierarchy System

This document defines the button hierarchy and styling system used throughout the app to ensure visual consistency and clear user actions.

## Button Types

### 1. **Primary Buttons** - Solid Blue
Main call-to-action buttons for the most important user actions.

**Style:**
```tsx
className="w-full py-4 rounded-2xl text-white"
style={{
  backgroundColor: "#1565C0",
  fontSize: "1.0625rem",
  fontWeight: 600,
  boxShadow: "0 4px 12px rgba(21,101,192,0.25)",
}}
```

**Important:** Always use `rounded-2xl` for primary buttons, NOT `rounded-full`.

**Use cases:**
- "Pay Now" (payment actions)
- "Create Goal" (goal creation)
- "Save Changes" / "Create" (form submissions)
- "Admin" button (admin panel access)
- "Share Code" (primary sharing action)
- "Generate QR Code" (primary member action)

**Examples:**
- Payment button in PaluwagangDetailScreen
- Create Goal button in GoalsScreen modal
- Admin button in header
- Generate QR button in AddMembersScreen

---

### 2. **Secondary Buttons** - Brand Green
Secondary positive actions or success states. Used sparingly to avoid competing with primary actions.

**Solid Style (Preferred - matches logo):**
```tsx
className="w-full py-4 rounded-2xl text-white"
style={{
  backgroundColor: "#66BB6A",
  fontSize: "1.0625rem",
  fontWeight: 600,
  boxShadow: "0 4px 12px rgba(102,187,106,0.25)",
}}
```

**Gradient Style (Alternative):**
```tsx
className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#4CAF50] to-[#45A049] text-white shadow-lg"
style={{
  fontSize: "1.0625rem",
  fontWeight: 600,
  boxShadow: "0 4px 12px rgba(76,175,80,0.25)",
}}
```

**Use cases:**
- "Next Module" (learning progression - use solid #66BB6A)
- "Download QR Code" (secondary action after generating QR - can use gradient)
- Success states (e.g., "Payment Complete" card background)
- Next payout hero section (positive outcome visualization)
- Confirmation states

**Examples:**
- Download QR button in AddMembersScreen
- Payment complete card in PaluwagangDetailScreen
- Hero payout countdown section

---

### 3. **Tertiary Buttons** - White/Outlined or Plain Text
Less important actions, cancel buttons, or secondary navigation.

**Outlined Style:**
```tsx
className="rounded-full border border-[rgba(17,24,39,0.1)] bg-white text-[#111827] hover:bg-[#F9F9FA] transition-colors"
```

**Plain Text Style (for Skip buttons):**
```tsx
className="text-[#6B7085] hover:text-[#111827] transition-colors"
style={{
  fontSize: "1.0625rem",
  fontWeight: 600,
}}
```

**Use cases:**
- "Skip for now" buttons (plain text)
- "Cancel" buttons (outlined)
- "Back" navigation
- "Report Issue" (less frequent action)
- "Join a Group" (secondary to "Create a Goal")
- "Add Manually" (alternative to primary QR action)
- Chat icon button

**Examples:**
- Cancel buttons in modals
- Back to Members button
- Report Issue button
- Chat icon in header
- Add Manually button in AddMembersScreen

---

### 4. **Destructive Buttons** - Red
Dangerous actions that require confirmation.

**Style:**
```tsx
className="w-full py-4 rounded-2xl bg-red-500 text-white shadow-lg"
style={{
  fontSize: "1.0625rem",
  fontWeight: 600,
  boxShadow: "0 4px 12px rgba(239,68,68,0.25)",
}}
```

**Use cases:**
- "Delete Goal"
- "Remove Member"
- "Submit Report" (warning action)

**Examples:**
- Delete confirmation modal
- Remove member action
- Report submission

---

## Border Radius Guidelines

- **Primary & Secondary Buttons:** `rounded-2xl` (16px border radius) - NEVER use `rounded-full`
- **Tertiary Buttons:** Outlined buttons use `rounded-2xl`, text-only buttons have no border
- **Cards & Containers:** `rounded-2xl` or `rounded-3xl`
- **Icon Buttons:** `rounded-full` for circular icon-only buttons

## Shadow Guidelines

- **Primary buttons:** `0 4px 12px rgba(21,101,192,0.25)`
- **Secondary buttons:** `0 4px 12px rgba(76,175,80,0.25)`
- **Destructive buttons:** `0 4px 12px rgba(239,68,68,0.25)`
- **Tertiary buttons:** No shadow or subtle `shadow-sm`

## Color Overuse Prevention

**Problem:** Blue and green gradients were overused throughout the app, creating visual confusion and poor hierarchy.

**Solution:**
1. **Solid blue (#1565C0)** is reserved for PRIMARY actions only - NO gradients on buttons
2. **Green gradient** is used for SECONDARY positive outcomes/actions (success states, celebrations)
3. **Plain text or white/outlined** is used for TERTIARY less important actions like "Skip for now"
4. **Information cards** use solid colors or subtle backgrounds instead of gradients
5. **Progress bars** can use horizontal gradients (90deg) for visual interest

## Implementation Checklist

When adding a new button, ask:

1. **Is this the main action on the screen?** → Primary (Blue)
2. **Is this a secondary positive action or success state?** → Secondary (Green)
3. **Is this a cancel, back, or less important action?** → Tertiary (White/outlined)
4. **Is this a destructive action?** → Destructive (Red)

## Updated Components

The following components have been updated to follow this hierarchy:

- ✅ **AddMembersScreen** - Generate QR (primary), Add Manually (tertiary), QR modal actions
- ✅ **PaluwagangDetailScreen** - Pay Now (primary), Admin (primary), Chat (tertiary), Report Issue (tertiary)
- ✅ **GoalsScreen** - Create Goal (primary), Join Group (tertiary), modal buttons
- 🔄 **Other components** - Apply as needed when updating

## Visual Hierarchy Best Practices

1. **One primary action per screen** - Avoid multiple solid blue buttons competing
2. **Solid colors for buttons** - Use solid #1565C0 for primary buttons, NOT gradients
3. **Green for celebration** - Use secondary green for positive outcomes, not competing CTAs
4. **Consistent spacing** - Maintain gap-3 between buttons in groups
5. **Hover states** - All buttons should have clear hover feedback
6. **Motion** - Use whileHover and whileTap for tactile feedback

## Gradient Usage Guidelines

**Allowed:**
- Progress bars: `linear-gradient(90deg, #1565C0 0%, #0d47a1 100%)` (horizontal only)
- Card backgrounds: Subtle gradients for visual depth
- Decorative elements: Glows, overlays

**NOT Allowed:**
- Primary action buttons - use solid #1565C0 instead
- Diagonal gradients on buttons (135deg, 170deg, etc.)
- Mixed gradients that combine blue with other colors on buttons
