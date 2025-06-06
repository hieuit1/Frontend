
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
    BusAddCoDriver,
    BusDriverListPage,
    BusCreateCoachPage,
    BusCoachListPage,
} from "../../../ticketSalesManagement/indexExport";

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
  showForm: boolean, setShowForm: (b: boolean) => void,
  showDriverForm: boolean, setShowDriverForm: (b: boolean) => void,
  showCoachForm: boolean, setShowCoachForm: (b: boolean) => void,
  showCoDriverForm: boolean, setShowCoDriverForm: (b: boolean) => void
) =>
  showForm ? (
    <>
      <Button onClick={() => setShowForm(false)} style={{ marginBottom: 16 }}>
        Quay lại danh sách vé
      </Button>
      <BusTicketSalesPage />
    </>
  ) : showCoDriverForm ? ( // ✅ Kiểm tra trạng thái mở trang tài xế phụ xe
    <>
      <Button onClick={() => setShowCoDriverForm(false)} style={{ marginBottom: 16 }}>
        Quay lại danh sách vé
      </Button>
      <BusAddCoDriver /> // ✅ Đúng trang tài xế phụ xe
    </>
  ) : showDriverForm ? (
    <>
      <Button onClick={() => setShowDriverForm(false)} style={{ marginBottom: 16 }}>
        Quay lại danh sách vé
      </Button>
      <BusAddDriver />
    </>
  ) : showCoachForm ? (
    <>
      <Button onClick={() => setShowCoachForm(false)} style={{ marginBottom: 16 }}>
        Quay lại danh sách vé
      </Button>
      <BusCreateCoachPage />
    </>
  ) : (
    <BusTicketSalesListPage
      onAddCoDriver={() => setShowCoDriverForm(true)} // ✅ Gọi đúng trạng thái
      onAddTicket={() => setShowForm(true)}
      onAddDriver={() => setShowDriverForm(true)}
      onAddCoach={() => setShowCoachForm(true)}
      onShowListDriver={() => setShowDriverForm(true)}
      onShowListCoach={() => setShowCoachForm(true)}
    />
  ),



};
