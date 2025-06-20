# Security Policy

## Supported Versions

We take security seriously. The following versions are currently supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it by emailing us at security@paket-uzb.com.

**Please do not create a public GitHub issue for security vulnerabilities.**

### What to Include

When reporting a vulnerability, please include:

- A description of the vulnerability
- Steps to reproduce the issue
- Potential impact of the vulnerability
- Any suggested fixes or mitigations

### Response Time

We will acknowledge your report within 48 hours and provide a more detailed response within 7 days.

## Security Measures

This project implements several security measures:

- **Helmet.js**: Adds security headers
- **CORS**: Properly configured cross-origin resource sharing
- **Rate Limiting**: Prevents abuse of API endpoints
- **Input Validation**: Server-side validation of all inputs
- **JWT Authentication**: Secure token-based authentication
- **Environment Variables**: Sensitive data stored in environment variables
- **HTTPS**: Recommended for production deployments

## Dependencies

We regularly monitor our dependencies for security vulnerabilities using:

- npm audit
- GitHub Security Advisories
- Dependabot alerts

## Production Security Checklist

Before deploying to production, ensure:

- [ ] All environment variables are properly set
- [ ] HTTPS is enabled
- [ ] Database connections are secure
- [ ] API keys are rotated regularly
- [ ] Logging is configured for security events
- [ ] Backup and recovery procedures are in place

## Contact

For security-related questions, contact us at security@paket-uzb.com.
