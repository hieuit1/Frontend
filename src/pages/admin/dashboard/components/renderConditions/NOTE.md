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
  BusAddCoDriver, // ✅ Import trang tạo tài xế phụ xe
  BusDriverListPage,
  BusCreateCoachPage,
  BusCoachListPage,
} from "../../../ticketSalesManagement/indexExport";

export const ticketRenderHandlers = {
  "Bán Vé Xe Bus": (
    showForm, setShowForm,
    showDriverForm, setShowDriverForm,
    showCoachForm, setShowCoachForm,
    showCoDriverForm, setShowCoDriverForm // ✅ Thêm trạng thái này
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
        <BusAddCoDriver /> // ✅ Mở trang tạo tài xế phụ xe
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
        onAddCoDriver={() => setShowCoDriverForm(true)} // ✅ Thêm chức năng mở trang tài xế phụ xe
        onAddTicket={() => setShowForm(true)}
        onAddDriver={() => setShowDriverForm(true)}
        onAddCoach={() => setShowCoachForm(true)}
        onShowListDriver={() => setShowDriverForm(true)}
        onShowListCoach={() => setShowCoachForm(true)}
      />
    ),
};
