import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import LandingPage from '../components/LandingPage'
// import InstrumentForm from '../components/Instrument/InstrumentForm'
import CreateInstrumentPage from '../components/Instrument/CreateInstrumentPage'
import UpdateInstrumentPage from '../components/Instrument/UpdateInstrumentPage';
import InstrumentDetails from '../components/Instrument/InstrumentDetails';
import DeleteInstrument from '../components/Instrument/DeleteInstrument'
import MyInstruments from '../components/MyInstruments/MyInstruments';
import MyOrders from '../components/Order/MyOrders';
import Layout from './Layout';
import Category from '../components/Category/Category';
import Favorites from '../components/Favorites/Favorites';

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
      {
        path: "/instruments/:instrumentId/delete",
        element: <DeleteInstrument />,
      },
      {
        path: "/instruments/:userId/MyInstruments",
        element: <MyInstruments />
      },
      {
        path: "/instruments/:userId/MyInstruments/:instrumentId/update",
        element: <UpdateInstrumentPage />
      },
      {
        path: "/instruments/:userId/MyInstruments/:instrumentId",
        element: <InstrumentDetails />
      },
      {
        path: "/orders/MyOrders",
        element: <MyOrders />
      },
      {
        path: "/instruments/category/:category",
        element: <Category />
      },
      {
        path: "/favorites",
        element: <Favorites />
      }
    ],
  },
]);