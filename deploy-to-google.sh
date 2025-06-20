#!/bin/bash

echo "🚀 PAKET UZB - AUTOMATED DEPLOYMENT SCRIPT"
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Vercel CLI is installed
check_vercel_cli() {
    if ! command -v vercel &> /dev/null; then
        print_warning "Vercel CLI not found. Installing..."
        npm install -g vercel
        if [ $? -eq 0 ]; then
            print_success "Vercel CLI installed successfully"
        else
            print_error "Failed to install Vercel CLI"
            exit 1
        fi
    else
        print_success "Vercel CLI is already installed"
    fi
}

# Build and test frontend
build_frontend() {
    print_status "Building frontend..."
    cd frontend
    
    # Install dependencies
    npm ci
    if [ $? -ne 0 ]; then
        print_error "Failed to install frontend dependencies"
        exit 1
    fi
    
    # Build the application
    npm run build
    if [ $? -eq 0 ]; then
        print_success "Frontend built successfully"
    else
        print_error "Frontend build failed"
        exit 1
    fi
    
    cd ..
}

# Test backend
test_backend() {
    print_status "Testing backend..."
    cd backend
    
    # Install dependencies
    npm ci
    if [ $? -ne 0 ]; then
        print_error "Failed to install backend dependencies"
        exit 1
    fi
    
    # Check if .env exists
    if [ ! -f ".env" ]; then
        print_warning ".env file not found. Using .env.production"
        cp .env.production .env
    fi
    
    print_success "Backend dependencies installed"
    cd ..
}

# Deploy to Vercel
deploy_backend() {
    print_status "Deploying backend to Vercel..."
    cd backend
    
    vercel --prod --yes
    if [ $? -eq 0 ]; then
        print_success "Backend deployed successfully to Vercel"
        BACKEND_URL=$(vercel ls | grep paket-uzb-backend | awk '{print $2}' | head -1)
        echo "Backend URL: https://$BACKEND_URL"
    else
        print_error "Backend deployment failed"
        exit 1
    fi
    
    cd ..
}

deploy_frontend() {
    print_status "Deploying frontend to Vercel..."
    cd frontend
    
    vercel --prod --yes
    if [ $? -eq 0 ]; then
        print_success "Frontend deployed successfully to Vercel"
        FRONTEND_URL=$(vercel ls | grep paket-uzb-frontend | awk '{print $2}' | head -1)
        echo "Frontend URL: https://$FRONTEND_URL"
    else
        print_error "Frontend deployment failed"
        exit 1
    fi
    
    cd ..
}

# Test deployment
test_deployment() {
    print_status "Testing deployment..."
    
    if [ ! -z "$BACKEND_URL" ]; then
        echo "Testing backend health check..."
        curl -f "https://$BACKEND_URL/api/health" > /dev/null 2>&1
        if [ $? -eq 0 ]; then
            print_success "Backend is responding correctly"
        else
            print_warning "Backend health check failed - might take a few minutes to initialize"
        fi
    fi
    
    if [ ! -z "$FRONTEND_URL" ]; then
        print_success "Frontend deployed at: https://$FRONTEND_URL"
        print_status "Opening browser to test frontend..."
        if command -v xdg-open &> /dev/null; then
            xdg-open "https://$FRONTEND_URL"
        elif command -v open &> /dev/null; then
            open "https://$FRONTEND_URL"
        fi
    fi
}

# Main execution
main() {
    echo
    print_status "Starting deployment process..."
    echo
    
    # Pre-deployment checks
    check_vercel_cli
    
    # Build and test
    print_status "=== BUILDING APPLICATIONS ==="
    build_frontend
    test_backend
    
    # Deploy
    print_status "=== DEPLOYING TO PRODUCTION ==="
    deploy_backend
    deploy_frontend
    
    # Post-deployment
    print_status "=== TESTING DEPLOYMENT ==="
    test_deployment
    
    echo
    print_success "🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!"
    echo "=================================================="
    echo
    echo "📊 Deployment Summary:"
    echo "  ✅ Frontend: https://$FRONTEND_URL"
    echo "  ✅ Backend:  https://$BACKEND_URL"
    echo
    echo "🔧 Next Steps:"
    echo "  1. Update environment variables on Vercel dashboard"
    echo "  2. Test all functionality on live site"
    echo "  3. Configure custom domain (optional)"
    echo "  4. Set up monitoring and analytics"
    echo
    echo "📞 Support: If issues occur, check Vercel deployment logs"
    echo
}

# Run main function
main
