# NagarDost - Central Admin Dashboard

A modern, responsive web dashboard for managing crowdsourced civic issue reporting and resolution. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Role-based Access Control**: Support for Citizen, Operator, Supervisor, and Admin roles
- **Interactive Maps**: OpenStreetMap integration with Leaflet.js for geospatial visualization
- **Real-time Analytics**: KPI dashboards and performance metrics
- **Report Management**: Comprehensive issue tracking and resolution workflows
- **Modern UI**: Beautiful, accessible interface built with Tailwind CSS and shadcn/ui
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Authentication**: Secure JWT-based authentication with AWS Cognito
- **Internationalization**: Support for English and Hindi languages

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Redux Toolkit + React Query
- **Routing**: React Router DOM
- **Maps**: Leaflet.js + OpenStreetMap
- **Charts**: Recharts
- **Authentication**: AWS Cognito
- **HTTP Client**: Axios
- **Forms**: React Hook Form + Zod validation
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── layout/         # Layout components (Header, Sidebar)
│   └── ui/             # Base UI components
├── pages/              # Page components
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Dashboard pages
│   ├── reports/        # Report management pages
│   ├── map/            # Map visualization pages
│   ├── analytics/      # Analytics and charts pages
│   └── admin/          # Admin panel pages
├── services/           # API services
├── store/              # Redux store and slices
├── types/              # TypeScript type definitions
├── lib/                # Utility functions
└── hooks/              # Custom React hooks
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Access to the NagarDost API backend

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd NagarDost-Dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables:
```bash
cp .env.example .env.local
```

4. Configure environment variables:
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_COGNITO_USER_POOL_ID=your-cognito-user-pool-id
VITE_COGNITO_CLIENT_ID=your-cognito-client-id
VITE_COGNITO_REGION=your-aws-region
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run storybook` - Start Storybook
- `npm run test` - Run tests

## 🎨 UI Components

The dashboard uses a custom design system built on top of Tailwind CSS and shadcn/ui. Key components include:

- **Layout Components**: Header, Sidebar, Navigation
- **Data Display**: Tables, Cards, Charts
- **Forms**: Inputs, Selects, Date Pickers
- **Feedback**: Toasts, Modals, Loading States
- **Maps**: Interactive map components with clustering

## 🔐 Authentication

The dashboard uses AWS Cognito for authentication with the following flow:

1. User enters phone number
2. OTP is sent to the phone
3. User verifies OTP to login
4. JWT tokens are stored and used for API requests

## 🗺️ Map Integration

The map functionality is powered by:

- **Leaflet.js**: Interactive map library
- **OpenStreetMap**: Free map tiles
- **React Leaflet**: React components for Leaflet
- **Marker Clustering**: For handling large numbers of reports
- **GeoJSON Support**: For ward boundaries and custom overlays

## 📊 Analytics

The analytics section provides:

- **KPI Dashboards**: Key performance indicators
- **Trend Analysis**: Time-series charts
- **Geographic Analysis**: Heatmaps and clusters
- **Performance Metrics**: SLA compliance, resolution times
- **Export Functionality**: CSV and PDF reports

## 🎯 Role-based Features

### Operator
- View assigned reports
- Update report status
- Upload resolution media
- Handle duplicate reports

### Supervisor
- Monitor team performance
- Manage escalations
- Configure routing rules
- View SLA compliance

### Admin
- User management
- System configuration
- Category and ward management
- Audit logs

## 🔧 Configuration

### API Configuration

The dashboard connects to the NagarDost API backend. Configure the API base URL in your environment variables:

```env
VITE_API_BASE_URL=http://localhost:5000
```

### AWS Cognito Configuration

Configure AWS Cognito for authentication:

```env
VITE_COGNITO_USER_POOL_ID=your-user-pool-id
VITE_COGNITO_CLIENT_ID=your-client-id
VITE_COGNITO_REGION=us-east-1
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to AWS Amplify

1. Connect your repository to AWS Amplify
2. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
3. Deploy

### Deploy to S3 + CloudFront

1. Build the project: `npm run build`
2. Upload `dist` folder to S3 bucket
3. Configure CloudFront distribution
4. Set up custom domain (optional)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Updates

Stay updated with the latest changes:

- Follow the repository for updates
- Check the changelog
- Review release notes

---

Built with ❤️ for better civic engagement and issue resolution.
