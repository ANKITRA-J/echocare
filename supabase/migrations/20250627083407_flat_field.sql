/*
  # Create Test Account for EchoCare

  1. Test User Setup
    - Creates a test user in auth.users with verified email
    - Email: test@echocare.com
    - Password: password123
    - User ID: 550e8400-e29b-41d4-a716-446655440000

  2. Stripe Integration
    - Creates test Stripe customer record
    - Sets up active Premium subscription
    - Links to the test user account

  3. Authentication
    - Creates identity record for email authentication
    - Email is pre-verified for immediate access
*/

-- First, clean up any existing test data
DELETE FROM stripe_subscriptions WHERE customer_id = 'cus_test_echocare_demo';
DELETE FROM stripe_customers WHERE customer_id = 'cus_test_echocare_demo';
DELETE FROM auth.identities WHERE user_id = '550e8400-e29b-41d4-a716-446655440000';
DELETE FROM auth.users WHERE id = '550e8400-e29b-41d4-a716-446655440000';

-- Insert test user into auth.users
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token,
  aud,
  role
) VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  '00000000-0000-0000-0000-000000000000',
  'test@echocare.com',
  '$2a$10$8K1p/a0dhrxSHxN7.5Wj4uRrfQNbs4GlJHFO4NjVadnY7Qp5PiB2.',  -- password123
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  '',
  '',
  'authenticated',
  'authenticated'
);

-- Insert test user identity
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  created_at,
  updated_at
) VALUES (
  '550e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440000',
  '{"sub": "550e8400-e29b-41d4-a716-446655440000", "email": "test@echocare.com", "email_verified": true}',
  'email',
  NOW(),
  NOW()
);

-- Create test stripe customer
INSERT INTO stripe_customers (
  user_id,
  customer_id,
  created_at,
  updated_at
) VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  'cus_test_echocare_demo',
  NOW(),
  NOW()
);

-- Create test subscription (Premium plan)
INSERT INTO stripe_subscriptions (
  customer_id,
  subscription_id,
  price_id,
  current_period_start,
  current_period_end,
  cancel_at_period_end,
  payment_method_brand,
  payment_method_last4,
  status,
  created_at,
  updated_at
) VALUES (
  'cus_test_echocare_demo',
  'sub_test_echocare_premium',
  'price_1ReIWsE7Ed5OJSsDNWGiihLZ',
  EXTRACT(EPOCH FROM NOW())::bigint,
  EXTRACT(EPOCH FROM (NOW() + INTERVAL '1 month'))::bigint,
  false,
  'visa',
  '4242',
  'active',
  NOW(),
  NOW()
);