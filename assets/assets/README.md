# Interior Designer Dashboard Portal

## Overview

The Interior Designer Dashboard Portal is the main interface for interior designers to manage their business operations on the Reno Research platform. It provides a comprehensive view of membership status, available leads, transactions, and messaging capabilities.

## File Structure

```
interior_designer_dashboard_portal/
├── interior_designer_dashboard_portal.dart (Main dashboard component)
└── widgets/
    ├── membership_status_card_widget.dart
    ├── transaction_history_widget.dart
    └── leads_list_widget.dart
```

## Architecture

### State Management
- Uses `StatefulWidget` with `TickerProviderStateMixin` for tab animation control
- Local state management for dashboard data
- Async data loading with loading/error states

### Navigation
- **Tab-based navigation**: 3 tabs (Home, Leads, Messages)
- **Routemaster** for route management
- Bottom navigation bar for primary navigation

## Key Features

### 1. Membership Management
- **Tiers**: Bronze, Silver, Gold, Platinum, Free
- **Features by Tier**:
  - **Bronze**: 0 keys, 0% discount, 100 MB storage
  - **Silver**: 1 key, 0% discount, 1 GB storage, 1 package
  - **Gold**: 5 keys, 5% discount, 5 GB storage, 3 packages
  - **Platinum**: 20 keys, 20% discount, 20 GB storage, unlimited packages

### 2. Credit System
- Wallet-based credit management
- Credit purchase for lead access
- Transaction history tracking (top-ups, spends, membership purchases)

### 3. Lead Management
- Browse available renovation project leads
- Purchase leads using credits
- Reject leads with reason tracking
- Lead details include:
  - Project type and title
  - Location and budget
  - Timeline and requirements
  - Homeowner profile

### 4. Authentication States
- **Guest Access**: Limited dashboard view without token
- **Authenticated Access**: Full functionality with stored token
- **Token Storage**: Uses `TokenStorageService` with `UserRole.designer`

## Data Flow

### Initial Load Sequence
```
initState() 
  → _loadDashboardData()
    → TokenStorageService.getToken(UserRole.designer)
    → AuthService().getInteriorDesignerInfo(token)
    → Parse API response
    → Load transactions (payments, top-ups, spends)
    → Generate mock leads
    → Load messages (if authenticated)
    → setState() with all data
```

### API Response Structure
```dart
{
  'id': String,
  'name': String,
  'email': String,
  'phone': String?,
  'membership': {
    'type': String,      // 'free', 'bronze', 'silver', 'gold', 'platinum'
    'status': String,    // 'active', 'expired'
    'expires': String,   // ISO 8601 date
    'numberOfKeys': int,
    'features': List<String>
  },
  'wallet': {
    'balance': int,
    'topUpHistory': List<Map>,
    'spendHistory': List<Map>
  },
  'payments': List<Map>
}
```

## Component Breakdown

### AppBar
- Displays platform branding "RENO RESEARCH"
- Shows membership tier badge
- Profile icon for settings access
- Gradient text styling with ShaderMask

### Home Tab (`_buildProfileTab`)
**Components:**
1. **Membership Status Card** (`MembershipStatusCardWidget`)
   - Current tier display
   - Credit balance
   - Upgrade button

2. **Membership Tier Info** (`_buildMembershipTierInfo`)
   - Tier details and benefits
   - Expiration date
   - Feature list
   - Upgrade option (non-platinum only)

3. **Transaction History** (`TransactionHistoryWidget`)
   - Lists all financial transactions
   - Types: membership_purchase, credit_purchase, lead_purchase

### Leads Tab (`_buildLeadsTab`)
**Features:**
- Lead cards with detailed information
- Purchase/Reject actions
- Credit requirement display
- Mock lead generation with realistic Singapore data

**Lead Types:**
- Premium Lead (180-300 credits)
- Standard Lead (85-95 credits)

**Lead Data Structure:**
```dart
{
  'id': String,
  'type': String,              // 'Premium Lead' or 'Standard Lead'
  'title': String,
  'location': String,
  'budget': String,
  'timeline': String,
  'credits_required': int,
  'description': String,
  'homeowner': String,
  'homeowner_profile': String,
  'project_requirements': List<String>,
  'posted_date': DateTime,
  'urgency': String,           // 'High', 'Medium', 'Low'
  'property_type': String,
  'size': String
}
```

### Messages Tab (`_buildMessagesTab`)
- Placeholder UI (feature in development)
- Future: Chat with homeowners
- Unread message indicator in tab icon

## User Interactions

### Lead Purchase Flow
```
User clicks "Purchase Lead"
  → Check credit balance
  → If insufficient → Show "Insufficient Credits" dialog
  → If sufficient → Show confirmation dialog
  → On confirm → UserService.purchaseLead()
  → Deduct credits
  → Refresh dashboard
  → Navigate to Messages tab
  → Open chat with homeowner
```

### Sign Out Flow
```
User clicks profile icon
  → Bottom sheet with options
  → User selects "Sign Out"
  → Confirmation dialog
  → On confirm → Show loading
  → TokenStorageService.removeToken(UserRole.designer)
  → Navigate to login screen
```

### Membership Upgrade Flow
```
Free tier user
  → Clicks "Join Membership"
  → Shows `_showMembershipPromptDialog()`
  → Displays benefits and offer
  → On "Join Now" → Navigate to tier comparison screen

Existing member
  → Clicks "Upgrade Membership"
  → Navigate to tier comparison screen
```

## Styling & Theme

### Color Scheme
```dart
_primaryGold: Color(0xFFf2b526)
_darkBronze: Color(0xFF7a5400)

Tier Colors:
- Bronze: Colors.orange[700]
- Silver: Colors.grey[600]
- Gold: Color(0xFFFFD700)
- Platinum: Colors.purple[600]
- Free: Colors.grey[500]
```

### Typography
- **Font**: Google Fonts Inter
- **Headings**: Bold, larger font sizes (14-18sp)
- **Body**: Regular/Medium weight (11-12sp)
- **Labels**: Small, uppercase with letter spacing (9-10sp)

### Responsive Sizing
- Uses `Sizer` package (w, h, sp units)
- Adapts to different screen sizes
- Mobile-first design approach

## Error Handling

### Error States
1. **Network Error**: "Failed to load designer information. Please try again."
2. **Authentication Error**: "Please log in" → Redirect to login
3. **Incomplete Registration**: "setup incomplete" → Redirect to registration
4. **Generic Error**: Display error message with retry button

### Loading States
- Full-screen loading indicator during initial data fetch
- "Loading your designer dashboard..." message
- Prevents interaction until data is loaded

## Services Integration

> **Note**: The platform is transitioning from Supabase to a Node.js Express backend with AWS infrastructure. All API integrations are being migrated to RESTful endpoints hosted on AWS EC2. So some data mismatch might be present. 

### AuthService
```dart
AuthService().getInteriorDesignerInfo(token)
```
- Fetches designer profile and membership data
- Returns API response with designer details

### UserService
```dart
UserService.purchaseLead(designerId, leadId, credits, leadData)
```
- Processes lead purchase
- Deducts credits from wallet
- Records transaction

### TokenStorageService
```dart
TokenStorageService.getToken(UserRole.designer)
TokenStorageService.removeToken(UserRole.designer)
```
- Manages authentication tokens
- Role-based token storage

## Future Enhancements

### Messages Feature
- Real-time chat with homeowners
- Message notifications
- Attachment support
- Chat history

### Analytics
- Dashboard analytics
- Lead conversion tracking
- Performance metrics

### Notifications
- Push notifications for new leads
- Membership expiration alerts
- Message notifications

## Testing Considerations

### Unit Tests
- Test membership tier calculations
- Validate transaction parsing
- Test credit balance checks
- Verify lead filtering logic

### Integration Tests
- Test full lead purchase flow
- Verify authentication flow
- Test navigation between tabs
- Validate API integration

### Widget Tests
- Test tab navigation
- Verify UI state changes
- Test dialog interactions
- Validate responsive layouts

## Common Issues & Solutions

### Issue: "Something went wrong" error
**Cause**: TabController length mismatch with TabBarView children
**Solution**: Ensure TabController length matches number of TabBarView children (currently 3)

### Issue: Insufficient credits dialog doesn't show
**Cause**: Credit balance not properly loaded from API
**Solution**: Check wallet.balance field in API response

### Issue: Transactions not displaying
**Cause**: Empty transaction arrays or parsing errors
**Solution**: Verify payments, topUpHistory, and spendHistory arrays exist in API response

## Code Maintenance

### Adding a New Tab
1. Increment TabController length
2. Add new tab to TabBar widget
3. Add corresponding view to TabBarView
4. Update `_currentIndex` handling
5. Add tab-specific FAB if needed

### Adding a New Membership Tier
1. Update `_getTierData()` method
2. Add tier color to `tierColors` map
3. Update tier comparison screen
4. Update backend validation

### Modifying Transaction Types
1. Update transaction parsing in `_loadDashboardData()`
2. Modify `TransactionHistoryWidget` display logic
3. Update transaction type enums
4. Update backend transaction creation

## Dependencies

```yaml
flutter: SDK
google_fonts: ^latest
sizer: ^latest
routemaster: ^latest
```

## Performance Considerations

- Lazy load transaction history for large datasets
- Cache membership tier data
- Optimize lead list rendering with ListView.builder
- Use const constructors where possible
- Minimize setState() calls

## Security Notes

- Tokens stored securely via TokenStorageService
- API calls require authentication
- Role-based access control (UserRole.designer)
- Sensitive data not logged in production

## Contact & Support

For questions or issues related to this component, please contact the development team or refer to the main project documentation.

---

**Last Updated**: November 6, 2025  
**Version**: 1.0.0  
**Maintainer**: Reno Research Development Team
