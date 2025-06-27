/*
  # Create Test Account

  1. Test User Creation
    - Creates a test user in auth.users table
    - Email: test@echocare.com
    - Password: password123 (hashed)
    - Email confirmed and verified

  2. Test Data Setup
    - Creates corresponding stripe_customers record
    - Sets up initial stripe_subscriptions record
    - Provides immediate access to all features
*/

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
  recovery_token
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
  ''
) ON CONFLICT (email) DO NOTHING;

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
  '{"sub": "550e8400-e29b-41d4-a716-446655440000", "email": "test@echocare.com"}',
  'email',
  NOW(),
  NOW()
) ON CONFLICT (provider, id) DO NOTHING;

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
) ON CONFLICT (user_id) DO NOTHING;

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
) ON CONFLICT (customer_id) DO NOTHING;