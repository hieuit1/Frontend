
import { Button } from "antd";
import {
  TouristBusTicketSalesListPage,
  TouristBusTicketSalesPage,
  IntercityBusTicketSalesListPage,
  IntercityBusTicketSalesPage,
  TrainTicketSalesListPage,
  TrainTicketSalesPage,
  MotorcycleTicketSalesListPage,
  MotorcycleTicketSalesPage,
  AirlineTicketSalesListPage,
  AirlineTicketSalesPage,
  TaxiTicketSalesListPage,
  TaxiTicketSalesPage,
    BusTicketSalesListPage,
    BusTicketSalesPage,
    BusAddDriver,
} from "../../../ticketSalesManagement/indexExport";
import { Add } from "@mui/icons-material";

export const ticketRenderHandlers = {
  "Bán Vé Xe Du Lịch": (showForm: boolean, setShowForm: (b: boolean) => void) =>
    showForm ? (
      <>
        <Button onClick={() => setShowForm(false)} style={{ marginBottom: 16 }}>
          Quay lại danh sách vé
        </Button>
        <TouristBusTicketSalesPage />
      </>
    ) : (
      <TouristBusTicketSalesListPage onAddTicket={() => setShowForm(true)} />
    ),

  "Bán Vé Xe Khách": (showForm: boolean, setShowForm: (b: boolean) => void) =>
    showForm ? (
      <>
        <Button onClick={() => setShowForm(false)} style={{ marginBottom: 16 }}>
          Quay lại danh sách vé
        </Button>
        <IntercityBusTicketSalesPage />
      </>
    ) : (
      <IntercityBusTicketSalesListPage onAddTicket={() => setShowForm(true)} />
    ),

  "Bán Vé Tàu": (showForm: boolean, setShowForm: (b: boolean) => void) =>
    showForm ? (
      <>
        <Button onClick={() => setShowForm(false)} style={{ marginBottom: 16 }}>
          Quay lại danh sách vé
        </Button>
        <TrainTicketSalesPage />
      </>
    ) : (
      <TrainTicketSalesListPage onAddTicket={() => setShowForm(true)} />
    ),

  "Bán Vé Máy Bay": (showForm: boolean, setShowForm: (b: boolean) => void) =>
    showForm ? (
      <>
        <Button onClick={() => setShowForm(false)} style={{ marginBottom: 16 }}>
          Quay lại danh sách vé
        </Button>
        <AirlineTicketSalesPage />
      </>
    ) : (
      <AirlineTicketSalesListPage onAddTicket={() => setShowForm(true)} />
    ),

  "Bán Vé Xe Ôm": (showForm: boolean, setShowForm: (b: boolean) => void) =>
    showForm ? (
      <>
        <Button onClick={() => setShowForm(false)} style={{ marginBottom: 16 }}>
          Quay lại danh sách vé
        </Button>
        <MotorcycleTicketSalesPage />
      </>
    ) : (
      <MotorcycleTicketSalesListPage onAddTicket={() => setShowForm(true)} />
    ),

  "Bán Vé Taxi": (showForm: boolean, setShowForm: (b: boolean) => void) =>
    showForm ? (
      <>
        <Button onClick={() => setShowForm(false)} style={{ marginBottom: 16 }}>
          Quay lại danh sách vé
        </Button>
        <TaxiTicketSalesPage />
      </>
    ) : (
      <TaxiTicketSalesListPage onAddTicket={() => setShowForm(true)} />
    ),
    "Bán Vé Xe Bus": (
    showForm: boolean,
    setShowForm: (b: boolean) => void,
    showDriverForm: boolean,
    setShowDriverForm: (b: boolean) => void
  ) =>
    showForm ? (
      <>
        <Button onClick={() => setShowForm(false)} style={{ marginBottom: 16 }}>
          Quay lại danh sách vé
        </Button>
        <BusTicketSalesPage />
      </>
    ) : showDriverForm ? (
      <>
        <Button
          onClick={() => setShowDriverForm(false)}
          style={{ marginBottom: 16 }}
        >
          Quay lại danh sách vé
        </Button>
        <BusAddDriver />
      </>
    ) : (
      <BusTicketSalesListPage
        onAddTicket={() => setShowForm(true)}
        onAddDriver={() => setShowDriverForm(true)}
      />
    ),

};
