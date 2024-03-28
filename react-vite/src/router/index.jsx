import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import LandingPage from '../components/LandingPage'
// import InstrumentForm from '../components/Instrument/InstrumentForm'
import CreateInstrumentPage from '../components/Instrument/CreateInstrumentPage'
import UpdateInstrumentPage from '../components/Instrument/UpdateInstrumentPage';
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
        path: "/instruments/:instrumentId",
        element: <InstrumentDetails />,
      },
      {
        path: "/instruments/new",
        element: <CreateInstrumentPage />,
      },
      {
        path: "/instruments/:instrumentId/update",
        element: <UpdateInstrumentPage />,
      },
    ],
  },
]);