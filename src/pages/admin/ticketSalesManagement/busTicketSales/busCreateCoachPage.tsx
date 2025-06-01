import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message, Select, Modal } from "antd";
import { UploadFile } from "antd";
import { fetchCoachById, createCoach } from "../../../../api/busCoachApi"; 

const { Option } = Select;

const BusCreateCoachPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [busId, setBusId] = useState<number | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchId = async () => {
      try {
        const coachData = await fetchCoachById(1); // 🔹 Giả sử ID xe khách là 1
        if (!coachData || !coachData.coachId) {
          message.error("Không thể lấy ID xe buýt, dữ liệu không hợp lệ!");
          return;
        }
        setBusId(coachData.coachId);
      } catch (error) {
        message.error("Không thể lấy ID xe khách");
      }
    };
    fetchId();
  }, []);

const onFinish = async (values: any) => {
  console.log("🚀 Bắt đầu gửi request đến API!");

  setLoading(true);
  const formData = new FormData();
  formData.append("coachName", values.busName); // ✅ Đúng với request Postman
  formData.append("licensePlateNumberCoach", values.licensePlate);

  if (fileList.length > 0 && fileList[0].originFileObj) {
    formData.append("image", fileList[0].originFileObj); // ✅ File ảnh
  }

  console.log("📡 Dữ liệu gửi đi:", formData);

  try {
    const response = await createCoach(formData);
    console.log("✅ API phản hồi:", response);
    setModalMessage("✅ Gửi thành công!");
    message.success("✅ Gửi thành công!");
  } catch (error) {
    console.error("❌ Lỗi khi gửi dữ liệu:", error);
    setModalMessage("❌ Gửi không thành công!");
    message.error("❌ Gửi không thành công!");
  } finally {
    setLoading(false);
    setModalVisible(true);
  }
};

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Thêm xe buýt mới</h2>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="ID Xe Buýt">
          <Input value={busId || "Đang tải..."} disabled />
        </Form.Item>

        <Form.Item label="Tên xe buýt" name="busName" rules={[{ required: true, message: "Vui lòng nhập tên xe buýt" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Biển số xe" name="licensePlate" rules={[{ required: true, message: "Vui lòng nhập biển số xe" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Loại xe" name="busType" rules={[{ required: true, message: "Vui lòng chọn loại xe" }]}>
          <Select placeholder="Chọn loại xe">
            <Option value="Giường nằm">Giường nằm</Option>
            <Option value="Ghế ngồi">Ghế ngồi</Option>
            <Option value="Cao cấp">Cao cấp</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item label="Ảnh xe buýt" name="image">
          <Upload
            beforeUpload={() => false}
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList as UploadFile[])}
            maxCount={1}
          >
            <Button>Chọn ảnh</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>Tạo xe buýt</Button>
        </Form.Item>
      </Form>

      {/* Modal hiển thị trạng thái gửi */}
      <Modal
  title="Trạng thái gửi"
  open={modalVisible}
  onOk={() => setModalVisible(false)}
  onCancel={() => setModalVisible(false)}
>
  <p className={modalMessage.startsWith("✅") ? "text-green-500" : "text-red-500"}>
    {modalMessage}
  </p>
</Modal>

    </div>
  );
};

export { BusCreateCoachPage };
