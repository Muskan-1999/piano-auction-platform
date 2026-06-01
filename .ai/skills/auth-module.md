# Sanctum Authentication Module

## Goal

Implement secure API authentication using Laravel Sanctum for the Piano Auction Platform.

---

# Authentication Features

Required APIs:

* Register User
* Login User
* Logout User
* Get Current Authenticated User
* Forgot Password
* Reset Password

Authentication Type:

* Token-based authentication using Laravel Sanctum

---

# User Roles

Supported Roles:

* admin
* bidder

Default Role:

* bidder

---

# User Table Fields

Required Fields:

* id
* name
* email
* phone
* address_line_1
* address_line_2
* city
* state
* postal_code
* country
* password
* role
* remember_token
* created_at
* updated_at

Rules:

* email must be unique
* password must be hashed
* role should default to bidder
* address fields should be nullable for guest-style bidding flexibility

---

# Required Backend Structure

Generate:

* Migration updates
* User model updates
* AuthController
* ForgotPasswordController
* ResetPasswordController
* Form Requests
* API Resources
* API routes
* Middleware protection

---

# API Endpoints

## Public Routes

POST /api/register
POST /api/login
POST /api/forgot-password
POST /api/reset-password

## Protected Routes

POST /api/logout
GET /api/user

Protected using:
auth:sanctum

---

# Validation Rules

## Register

* name required
* email required and unique
* phone nullable
* address_line_1 nullable
* address_line_2 nullable
* city nullable
* state nullable
* postal_code nullable
* country nullable
* password required
* password confirmation required

## Login

* email required
* password required

## Forgot Password

* email required
* email must exist

## Reset Password

* token required
* email required
* password required
* password confirmation required

---

# Security Rules

* Hash passwords using Laravel Hash facade
* Generate Sanctum tokens after login
* Revoke tokens on logout
* Protect sensitive routes using auth:sanctum middleware
* Use Laravel Password Broker
* Use secure reset tokens
* Expire reset tokens automatically
* Hash new password before saving

---

# Password Reset Flow

## Forgot Password Flow

1. User submits email
2. Generate password reset token
3. Send password reset email
4. User clicks reset link
5. User submits new password
6. Password updated securely

---

# Controller Rules

* Keep controllers thin
* Use Form Requests for validation
* Use API Resources
* Return JSON API responses
* Use service classes if logic becomes complex

---

# Response Format

## Success Response Example

{
"success": true,
"message": "Login successful",
"token": "sanctum_token",
"user": {}
}

## Error Response Example

{
"success": false,
"message": "Invalid credentials"
}

---

# Architecture Rules

* API-first architecture
* No Blade authentication UI
* React frontend will consume APIs
* Use RESTful API structure
* Keep logic modular
* Optimize for scalability and MVP speed

---

# Middleware Rules

Use middleware for:

* auth:sanctum
* admin access
* bidder access

Rules:

* Protect authenticated APIs using auth:sanctum
* Separate public and protected routes
* Keep middleware reusable

---

# Required Laravel Features

* Sanctum token authentication
* Password reset tokens
* API Resources
* Form Requests
* Route grouping
* Middleware aliases

---

# Important Git Rules

* NEVER auto commit
* NEVER auto push
* ALWAYS ask before Git operations
* NEVER overwrite existing files without confirmation
