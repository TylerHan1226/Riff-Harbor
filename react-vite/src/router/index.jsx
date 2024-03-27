import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import LandingPage from '../components/LandingPage'
import CreateInstrumentForm from '../components/Instrument/CreateInstrumentForm'
import InstrumentDetails from '../components/Instrument/InstrumentDetails';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/instruments/new",
        element: <CreateInstrumentForm />,
      },
      {
        path: "/instruments/:instrumentId",
        element: <InstrumentDetails />,
      },
    ],
  },
]);