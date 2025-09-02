# NagarDost API Endpoints Documentation

## Base URL
```
https://api.nagardost.com
```

## Authentication
- **Type**: JWT Bearer Token
- **Header**: `Authorization: Bearer <token>`
- **Rate Limiting**: 100 requests per 15 minutes per IP

---

## 1. Health Check

### GET /health
**Description**: Check API health status
**Authentication**: None
**Response**:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0"
}
```

---

## 2. Authentication Endpoints

### POST /auth/send-otp
**Description**: Send OTP to phone number for registration/login
**Authentication**: None
**Request Body**:
```json
{
  "phone": "9876543210"
}
```
**Validation**: Phone must be 10-digit Indian mobile number (6-9XXXXXXXXX)
**Response**:
```json
{
  "success": true,
  "message": "OTP sent successfully to your phone number",
  "data": {
    "phone": "9876543210",
    "expires_in": 600
  }
}
```

### POST /auth/verify-otp
**Description**: Verify OTP code
**Authentication**: None
**Request Body**:
```json
{
  "phone": "9876543210",
  "otp_code": "123456"
}
```
**Validation**: OTP code must be 4-6 digits
**Response**:
```json
{
  "success": true,
  "message": "OTP verified successfully",
  "data": {
    "user_id": "uuid",
    "registration_status": "pending"
  }
}
```

### POST /auth/register
**Description**: Complete user registration
**Authentication**: None
**Request Body**:
```json
{
  "phone": "9876543210",
  "first_name": "John",
  "last_name": "Doe",
  "address": "123 Main Street, City",
  "latitude": 12.9716,
  "longitude": 77.5946,
  "municipality_name": "Bangalore Municipal Corporation"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Registration completed successfully",
  "data": {
    "user_id": "uuid",
    "access_token": "jwt_token",
    "refresh_token": "refresh_token"
  }
}
```

### POST /auth/login
**Description**: User login with phone and password
**Authentication**: None
**Request Body**:
```json
{
  "phone": "9876543210",
  "password": "password123"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user_id": "uuid",
    "access_token": "jwt_token",
    "refresh_token": "refresh_token"
  }
}
```

### POST /auth/refresh
**Description**: Refresh access token
**Authentication**: None
**Request Body**:
```json
{
  "refresh_token": "refresh_token_string"
}
```
**Response**:
```json
{
  "success": true,
  "data": {
    "access_token": "new_jwt_token",
    "refresh_token": "new_refresh_token"
  }
}
```

### POST /auth/logout
**Description**: User logout
**Authentication**: None
**Request Body**:
```json
{
  "refresh_token": "refresh_token_string"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Logout successful"
}
```

### POST /auth/kyc-verify
**Description**: Verify KYC with Aadhar number
**Authentication**: Required
**Request Body**:
```json
{
  "aadhar_number": "123456789012"
}
```
**Validation**: Aadhar must be 12 digits
**Response**:
```json
{
  "success": true,
  "message": "KYC verification successful",
  "data": {
    "kyc_verified": true
  }
}
```

### GET /auth/profile
**Description**: Get user profile
**Authentication**: Required
**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "first_name": "John",
    "last_name": "Doe",
    "phone": "9876543210",
    "email": "john@example.com",
    "address": "123 Main Street",
    "municipality_name": "Bangalore Municipal Corporation",
    "kyc_verified": true,
    "registration_status": "completed"
  }
}
```

### PATCH /auth/profile
**Description**: Update user profile
**Authentication**: Required
**Request Body**:
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "address": "123 Main Street",
  "municipality_name": "Bangalore Municipal Corporation"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user_id": "uuid"
  }
}
```

---

## 3. Admin Staff Authentication

### POST /admin-staff/login
**Description**: Admin staff login with username/password
**Authentication**: None
**Request Body**:
```json
{
  "username": "admin_user",
  "password": "password123"
}
```
**Response**:
```json
{
  "success": true,
  "data": {
    "user_id": "uuid",
    "role": "admin",
    "access_token": "jwt_token",
    "refresh_token": "refresh_token"
  }
}
```

### POST /admin-staff/refresh
**Description**: Refresh admin staff access token
**Authentication**: None
**Request Body**:
```json
{
  "refresh_token": "refresh_token_string"
}
```
**Response**:
```json
{
  "success": true,
  "data": {
    "access_token": "new_jwt_token",
    "refresh_token": "new_refresh_token"
  }
}
```

### POST /admin-staff/logout
**Description**: Admin staff logout
**Authentication**: None
**Request Body**:
```json
{
  "refresh_token": "refresh_token_string"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Logout successful"
}
```

### GET /admin-staff/profile
**Description**: Get admin staff profile
**Authentication**: Required (Admin Staff)
**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "username": "admin_user",
    "first_name": "Admin",
    "last_name": "User",
    "role": "admin",
    "department": "IT Department"
  }
}
```

### PATCH /admin-staff/change-password
**Description**: Change admin staff password
**Authentication**: Required (Admin Staff)
**Request Body**:
```json
{
  "current_password": "old_password",
  "new_password": "new_password123"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

## 4. Citizen Endpoints

### GET /citizen/reports
**Description**: Get citizen's own reports
**Authentication**: Required
**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `status` (optional): Filter by status
**Response**:
```json
{
  "success": true,
  "data": {
    "reports": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "pages": 5
    }
  }
}
```

### GET /citizen/reports/:reportId
**Description**: Get specific report by citizen
**Authentication**: Required
**Response**:
```json
{
  "success": true,
  "data": {
    "report": {...}
  }
}
```

### POST /citizen/reports
**Description**: Submit a new report
**Authentication**: Required
**Request Body**:
```json
{
  "category_id": "uuid",
  "title": "Pothole on Main Road",
  "description": "Large pothole causing traffic issues",
  "location": {
    "latitude": 12.9716,
    "longitude": 77.5946,
    "address": "Main Road, Bangalore"
  },
  "media_ids": ["uuid1", "uuid2"],
  "is_anonymous": false
}
```
**Response**:
```json
{
  "success": true,
  "message": "Report submitted successfully",
  "data": {
    "report_id": "uuid"
  }
}
```

### PUT /citizen/reports/:reportId
**Description**: Update a report (only if pending)
**Authentication**: Required
**Request Body**:
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "media_ids": ["uuid1", "uuid2"]
}
```
**Response**:
```json
{
  "success": true,
  "message": "Report updated successfully"
}
```

### GET /citizen/categories
**Description**: Get available categories for report submission
**Authentication**: Required
**Response**:
```json
{
  "success": true,
  "data": {
    "categories": [...]
  }
}
```

### GET /citizen/localbody/:localbodyId
**Description**: Get localbody information
**Authentication**: Required
**Response**:
```json
{
  "success": true,
  "data": {
    "localbody": {...}
  }
}
```

---

## 5. Report Management

### GET /reports
**Description**: Get reports with filtering and pagination
**Authentication**: Required
**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (1-100, default: 20)
- `category_id` (optional): Filter by category UUID
- `status` (optional): Filter by status (pending, assigned, in_progress, resolved, closed, rejected, duplicate)
- `ward_id` (optional): Filter by ward UUID
- `department_id` (optional): Filter by department UUID
- `priority` (optional): Filter by priority (low, medium, high, urgent)
- `date_from` (optional): Filter from date (ISO8601)
- `date_to` (optional): Filter to date (ISO8601)
- `sort_by` (optional): Sort by (created_at, updated_at, priority, status)
- `sort_order` (optional): Sort order (asc, desc)
**Response**:
```json
{
  "success": true,
  "data": {
    "reports": [...],
    "pagination": {...}
  }
}
```

### GET /reports/:id
**Description**: Get report by ID
**Authentication**: Required
**Response**:
```json
{
  "success": true,
  "data": {
    "report": {...}
  }
}
```

### POST /reports
**Description**: Create new report
**Authentication**: Required
**Request Body**:
```json
{
  "category_id": "uuid",
  "title": "Report title",
  "description": "Report description",
  "location": {
    "latitude": 12.9716,
    "longitude": 77.5946,
    "address": "Address string"
  },
  "media_ids": ["uuid1", "uuid2"],
  "is_anonymous": false
}
```
**Response**:
```json
{
  "message": "Report created successfully",
  "report": {...}
}
```

### PATCH /reports/:id
**Description**: Update report
**Authentication**: Required
**Request Body**:
```json
{
  "status": "in_progress",
  "priority": "high",
  "notes": "Update notes",
  "media_ids": ["uuid1", "uuid2"]
}
```
**Response**:
```json
{
  "success": true,
  "message": "Report updated successfully"
}
```

### POST /reports/:id/merge
**Description**: Merge duplicate reports
**Authentication**: Required (Supervisor, Admin)
**Request Body**:
```json
{
  "target_report_id": "uuid"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Reports merged successfully"
}
```

### GET /reports/:id/timeline
**Description**: Get report timeline
**Authentication**: Required
**Response**:
```json
{
  "success": true,
  "data": {
    "timeline": [...]
  }
}
```

### POST /reports/:id/upvote
**Description**: Upvote report
**Authentication**: Required
**Response**:
```json
{
  "success": true,
  "message": "Report upvoted successfully"
}
```

### POST /reports/:id/downvote
**Description**: Downvote report
**Authentication**: Required
**Response**:
```json
{
  "success": true,
  "message": "Report downvoted successfully"
}
```

### GET /reports/nearby/:id
**Description**: Get nearby reports
**Authentication**: Required
**Query Parameters**:
- `radius` (optional): Radius in km (0.001-10, default: 1)
- `limit` (optional): Number of reports (1-50, default: 10)
**Response**:
```json
{
  "success": true,
  "data": {
    "reports": [...]
  }
}
```

### GET /reports/duplicates/:id
**Description**: Get potential duplicates
**Authentication**: Required (Operator, Supervisor, Admin)
**Query Parameters**:
- `similarity_threshold` (optional): Similarity threshold (0-1, default: 0.8)
**Response**:
```json
{
  "success": true,
  "data": {
    "duplicates": [...]
  }
}
```

### POST /reports/:id/escalate
**Description**: Escalate report
**Authentication**: Required (Operator, Supervisor)
**Request Body**:
```json
{
  "reason": "Escalation reason"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Report escalated successfully"
}
```

### DELETE /reports/:id
**Description**: Delete report (soft delete)
**Authentication**: Required (Supervisor, Admin)
**Request Body**:
```json
{
  "reason": "Deletion reason"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Report deleted successfully"
}
```

### GET /reports/export
**Description**: Export reports
**Authentication**: Required (Supervisor, Admin)
**Query Parameters**:
- `format` (optional): Export format (csv, json)
- `date_from` (optional): From date (ISO8601)
- `date_to` (optional): To date (ISO8601)
**Response**: File download

### GET /reports/stats
**Description**: Get report statistics
**Authentication**: Required (Operator, Supervisor, Admin)
**Query Parameters**:
- `date_from` (optional): From date (ISO8601)
- `date_to` (optional): To date (ISO8601)
**Response**:
```json
{
  "success": true,
  "data": {
    "stats": {...}
  }
}
```

---

## 6. Media Management

### POST /media/presign
**Description**: Generate presigned URL for upload
**Authentication**: Required
**Request Body**:
```json
{
  "report_id": "uuid",
  "filename": "image.jpg",
  "content_type": "image/jpeg",
  "file_size": 1048576
}
```
**Validation**: File size 1-10MB
**Response**:
```json
{
  "success": true,
  "data": {
    "media_id": "uuid",
    "presigned_url": "https://...",
    "expires_in": 3600
  }
}
```

### POST /media/:id/confirm
**Description**: Confirm upload
**Authentication**: Required
**Response**:
```json
{
  "success": true,
  "message": "Upload confirmed successfully"
}
```

### GET /media/:id
**Description**: Get media by ID
**Authentication**: Required
**Response**:
```json
{
  "success": true,
  "data": {
    "media": {...}
  }
}
```

### GET /media/report/:reportId
**Description**: Get media by report ID
**Authentication**: Required
**Response**:
```json
{
  "success": true,
  "data": {
    "media": [...]
  }
}
```

### DELETE /media/:id
**Description**: Delete media
**Authentication**: Required
**Response**:
```json
{
  "success": true,
  "message": "Media deleted successfully"
}
```

### GET /media/stats
**Description**: Get media statistics
**Authentication**: Required (Supervisor, Admin)
**Response**:
```json
{
  "success": true,
  "data": {
    "stats": {...}
  }
}
```

---

## 7. Assignment Management

### GET /assignments
**Description**: Get assignments (staff inbox)
**Authentication**: Required
**Query Parameters**:
- `status` (optional): Filter by status (pending, accepted, in_progress, on_hold, completed, rejected)
- `assigned_to` (optional): Filter by assigned user UUID
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (1-100, default: 20)
**Response**:
```json
{
  "success": true,
  "data": {
    "assignments": [...],
    "pagination": {...}
  }
}
```

### GET /assignments/:id
**Description**: Get assignment by ID
**Authentication**: Required
**Response**:
```json
{
  "success": true,
  "data": {
    "assignment": {...}
  }
}
```

### POST /assignments
**Description**: Create assignment
**Authentication**: Required (Supervisor, Admin)
**Request Body**:
```json
{
  "report_id": "uuid",
  "assigned_to": "uuid",
  "team_id": "uuid",
  "notes": "Assignment notes",
  "estimated_hours": 4.5,
  "due_date": "2024-01-15T00:00:00.000Z"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Assignment created successfully",
  "data": {
    "assignment_id": "uuid"
  }
}
```

### PATCH /assignments/:id
**Description**: Update assignment
**Authentication**: Required
**Request Body**:
```json
{
  "status": "in_progress",
  "notes": "Update notes",
  "resolution_notes": "Resolution details",
  "actual_hours": 5.0
}
```
**Response**:
```json
{
  "success": true,
  "message": "Assignment updated successfully"
}
```

### POST /assignments/:id/accept
**Description**: Accept assignment
**Authentication**: Required
**Response**:
```json
{
  "success": true,
  "message": "Assignment accepted successfully"
}
```

### POST /assignments/:id/start
**Description**: Start work on assignment
**Authentication**: Required
**Response**:
```json
{
  "success": true,
  "message": "Assignment started successfully"
}
```

### POST /assignments/:id/complete
**Description**: Complete assignment
**Authentication**: Required
**Request Body**:
```json
{
  "resolution_notes": "Completion notes",
  "actual_hours": 5.0
}
```
**Response**:
```json
{
  "success": true,
  "message": "Assignment completed successfully"
}
```

### POST /assignments/:id/reject
**Description**: Reject assignment
**Authentication**: Required
**Request Body**:
```json
{
  "reason": "Rejection reason"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Assignment rejected successfully"
}
```

### POST /assignments/:id/reassign
**Description**: Reassign assignment
**Authentication**: Required (Supervisor, Admin)
**Request Body**:
```json
{
  "new_assigned_to": "uuid",
  "reason": "Reassignment reason"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Assignment reassigned successfully"
}
```

### GET /assignments/stats
**Description**: Get assignment statistics
**Authentication**: Required (Supervisor, Admin)
**Response**:
```json
{
  "success": true,
  "data": {
    "stats": {...}
  }
}
```

---

## 8. Local Body Management

### GET /localbody
**Description**: Get all localbodies
**Authentication**: Required (Admin Staff)
**Response**:
```json
{
  "success": true,
  "data": {
    "localbodies": [...]
  }
}
```

### GET /localbody/:localbodyId
**Description**: Get specific localbody
**Authentication**: Required (Admin Staff)
**Response**:
```json
{
  "success": true,
  "data": {
    "localbody": {...}
  }
}
```

### POST /localbody
**Description**: Create new localbody
**Authentication**: Required (Admin Staff)
**Request Body**:
```json
{
  "name": "Local Body Name",
  "code": "LB001",
  "type": "municipality",
  "address": "Address",
  "contact_info": {...}
}
```
**Response**:
```json
{
  "success": true,
  "message": "Local body created successfully",
  "data": {
    "localbody_id": "uuid"
  }
}
```

### PUT /localbody/:localbodyId
**Description**: Update localbody
**Authentication**: Required (Admin Staff)
**Request Body**:
```json
{
  "name": "Updated Name",
  "address": "Updated Address"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Local body updated successfully"
}
```

### GET /localbody/:localbodyId/stats
**Description**: Get localbody statistics
**Authentication**: Required (Admin Staff)
**Response**:
```json
{
  "success": true,
  "data": {
    "stats": {...}
  }
}
```

---

## 9. Routing Management

### POST /routing/evaluate
**Description**: Evaluate routing for a report
**Authentication**: Required (Supervisor, Admin)
**Request Body**:
```json
{
  "report_id": "uuid",
  "category_id": "uuid",
  "ward_id": "uuid"
}
```
**Response**:
```json
{
  "success": true,
  "data": {
    "routing_result": {...}
  }
}
```

### GET /routing/rules
**Description**: Get routing rules
**Authentication**: Required (Supervisor, Admin)
**Response**:
```json
{
  "success": true,
  "data": {
    "rules": [...]
  }
}
```

### POST /routing/rules
**Description**: Create routing rule
**Authentication**: Required (Admin)
**Request Body**:
```json
{
  "name": "Rule Name",
  "description": "Rule description",
  "category_id": "uuid",
  "ward_id": "uuid",
  "department_id": "uuid",
  "team_id": "uuid",
  "priority": 5,
  "assignment_type": "auto",
  "specific_user_id": "uuid"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Routing rule created successfully",
  "data": {
    "rule_id": "uuid"
  }
}
```

### PATCH /routing/rules/:id
**Description**: Update routing rule
**Authentication**: Required (Admin)
**Request Body**:
```json
{
  "name": "Updated Name",
  "description": "Updated description",
  "is_active": true,
  "priority": 3
}
```
**Response**:
```json
{
  "success": true,
  "message": "Routing rule updated successfully"
}
```

### DELETE /routing/rules/:id
**Description**: Delete routing rule
**Authentication**: Required (Admin)
**Response**:
```json
{
  "success": true,
  "message": "Routing rule deleted successfully"
}
```

### GET /routing/stats
**Description**: Get routing statistics
**Authentication**: Required (Supervisor, Admin)
**Response**:
```json
{
  "success": true,
  "data": {
    "stats": {...}
  }
}
```

---

## 10. Analytics

### GET /analytics/summary
**Description**: Get analytics summary
**Authentication**: Required (Operator, Supervisor, Admin)
**Query Parameters**:
- `date_from` (optional): From date (ISO8601)
- `date_to` (optional): To date (ISO8601)
**Response**:
```json
{
  "success": true,
  "data": {
    "summary": {...}
  }
}
```

### GET /analytics/hotspots
**Description**: Get hotspot data
**Authentication**: Required (Operator, Supervisor, Admin)
**Query Parameters**:
- `radius` (optional): Radius in km (0.001-10, default: 1)
- `date_from` (optional): From date (ISO8601)
- `date_to` (optional): To date (ISO8601)
**Response**:
```json
{
  "success": true,
  "data": {
    "hotspots": [...]
  }
}
```

### GET /analytics/department-performance
**Description**: Get department performance
**Authentication**: Required (Supervisor, Admin)
**Query Parameters**:
- `date_from` (optional): From date (ISO8601)
- `date_to` (optional): To date (ISO8601)
**Response**:
```json
{
  "success": true,
  "data": {
    "performance": [...]
  }
}
```

### GET /analytics/user-performance
**Description**: Get user performance
**Authentication**: Required (Supervisor, Admin)
**Query Parameters**:
- `date_from` (optional): From date (ISO8601)
- `date_to` (optional): To date (ISO8601)
**Response**:
```json
{
  "success": true,
  "data": {
    "performance": [...]
  }
}
```

### GET /analytics/trends
**Description**: Get trend data
**Authentication**: Required (Operator, Supervisor, Admin)
**Query Parameters**:
- `metric` (required): Metric type (reports, resolutions, sla_compliance)
- `period` (required): Period (daily, weekly, monthly)
- `date_from` (optional): From date (ISO8601)
- `date_to` (optional): To date (ISO8601)
**Response**:
```json
{
  "success": true,
  "data": {
    "trends": [...]
  }
}
```

### GET /analytics/sla-breaches
**Description**: Get SLA breach analysis
**Authentication**: Required (Supervisor, Admin)
**Query Parameters**:
- `date_from` (optional): From date (ISO8601)
- `date_to` (optional): To date (ISO8601)
**Response**:
```json
{
  "success": true,
  "data": {
    "breaches": [...]
  }
}
```

---

## 11. Admin Management

### Categories Management

#### GET /admin/categories
**Description**: Get all categories
**Authentication**: Required (Admin)
**Response**:
```json
{
  "success": true,
  "data": {
    "categories": [...]
  }
}
```

#### POST /admin/categories
**Description**: Create category
**Authentication**: Required (Admin)
**Request Body**:
```json
{
  "name": "Category Name",
  "code": "CAT001",
  "description": "Category description",
  "sla_hours": 48,
  "escalation_hours": 24,
  "department_id": "uuid",
  "priority": 3
}
```
**Response**:
```json
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "category_id": "uuid"
  }
}
```

#### PATCH /admin/categories/:id
**Description**: Update category
**Authentication**: Required (Admin)
**Request Body**:
```json
{
  "name": "Updated Name",
  "is_active": true
}
```
**Response**:
```json
{
  "success": true,
  "message": "Category updated successfully"
}
```

### Wards Management

#### GET /admin/wards
**Description**: Get all wards
**Authentication**: Required (Admin)
**Response**:
```json
{
  "success": true,
  "data": {
    "wards": [...]
  }
}
```

#### POST /admin/wards
**Description**: Create ward
**Authentication**: Required (Admin)
**Request Body**:
```json
{
  "name": "Ward Name",
  "code": "WARD001",
  "description": "Ward description",
  "supervisor_id": "uuid"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Ward created successfully",
  "data": {
    "ward_id": "uuid"
  }
}
```

#### PATCH /admin/wards/:id
**Description**: Update ward
**Authentication**: Required (Admin)
**Request Body**:
```json
{
  "name": "Updated Name",
  "is_active": true
}
```
**Response**:
```json
{
  "success": true,
  "message": "Ward updated successfully"
}
```

### Departments Management

#### GET /admin/departments
**Description**: Get all departments
**Authentication**: Required (Admin)
**Response**:
```json
{
  "success": true,
  "data": {
    "departments": [...]
  }
}
```

#### POST /admin/departments
**Description**: Create department
**Authentication**: Required (Admin)
**Request Body**:
```json
{
  "name": "Department Name",
  "code": "DEPT001",
  "description": "Department description",
  "head_id": "uuid",
  "parent_department_id": "uuid"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Department created successfully",
  "data": {
    "department_id": "uuid"
  }
}
```

#### PATCH /admin/departments/:id
**Description**: Update department
**Authentication**: Required (Admin)
**Request Body**:
```json
{
  "name": "Updated Name",
  "is_active": true
}
```
**Response**:
```json
{
  "success": true,
  "message": "Department updated successfully"
}
```

### Users Management

#### GET /admin/users
**Description**: Get all users
**Authentication**: Required (Admin)
**Response**:
```json
{
  "success": true,
  "data": {
    "users": [...]
  }
}
```

#### POST /admin/users
**Description**: Create user
**Authentication**: Required (Admin)
**Request Body**:
```json
{
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "role": "operator",
  "phone": "9876543210",
  "ward_id": "uuid",
  "department_id": "uuid"
}
```
**Response**:
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "user_id": "uuid"
  }
}
```

#### PATCH /admin/users/:id
**Description**: Update user
**Authentication**: Required (Admin)
**Request Body**:
```json
{
  "first_name": "Updated Name",
  "role": "supervisor",
  "is_active": true
}
```
**Response**:
```json
{
  "success": true,
  "message": "User updated successfully"
}
```

### Teams Management

#### GET /admin/teams
**Description**: Get all teams
**Authentication**: Required (Admin)
**Response**:
```json
{
  "success": true,
  "data": {
    "teams": [...]
  }
}
```

#### POST /admin/teams
**Description**: Create team
**Authentication**: Required (Admin)
**Request Body**:
```json
{
  "name": "Team Name",
  "code": "TEAM001",
  "department_id": "uuid",
  "team_lead_id": "uuid",
  "max_capacity": 10
}
```
**Response**:
```json
{
  "success": true,
  "message": "Team created successfully",
  "data": {
    "team_id": "uuid"
  }
}
```

### System Configuration

#### GET /admin/config
**Description**: Get system configuration
**Authentication**: Required (Admin)
**Response**:
```json
{
  "success": true,
  "data": {
    "config": {...}
  }
}
```

#### PATCH /admin/config
**Description**: Update system configuration
**Authentication**: Required (Admin)
**Request Body**:
```json
{
  "sla_default_hours": 48,
  "escalation_default_hours": 24,
  "max_file_size": 10485760,
  "rate_limit_requests": 100
}
```
**Response**:
```json
{
  "success": true,
  "message": "Configuration updated successfully"
}
```

### Audit Logs

#### GET /admin/audit-logs
**Description**: Get audit logs
**Authentication**: Required (Admin)
**Response**:
```json
{
  "success": true,
  "data": {
    "logs": [...]
  }
}
```

#### GET /admin/audit-logs/export
**Description**: Export audit logs
**Authentication**: Required (Admin)
**Response**: File download

### System Health

#### GET /admin/system-health
**Description**: Get system health status
**Authentication**: Required (Admin)
**Response**:
```json
{
  "success": true,
  "data": {
    "health": {...}
  }
}
```

#### GET /admin/system-stats
**Description**: Get system statistics
**Authentication**: Required (Admin)
**Response**:
```json
{
  "success": true,
  "data": {
    "stats": {...}
  }
}
```

---

## 12. API Documentation

### GET /docs
**Description**: Get API documentation
**Authentication**: None
**Response**:
```json
{
  "message": "API Documentation",
  "version": "1.0.0",
  "endpoints": {...},
  "authentication": {...},
  "rate_limiting": {...}
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Validation failed",
  "details": [...]
}
```

### 401 Unauthorized
```json
{
  "error": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "error": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "Error details"
}
```

---

## Notes

1. **Authentication**: Most endpoints require JWT authentication via Bearer token in Authorization header
2. **Role-based Access**: Different endpoints require different user roles (citizen, operator, supervisor, admin)
3. **Validation**: All request bodies and query parameters are validated according to specified rules
4. **Pagination**: List endpoints support pagination with `page` and `limit` parameters
5. **File Uploads**: Media uploads use presigned URLs for secure direct upload to cloud storage
6. **Rate Limiting**: API is rate-limited to 100 requests per 15 minutes per IP address