import React, { useEffect, useState } from "react";
import { Table, Input, Button, Popconfirm, message, Modal, Form } from "antd";
import { fetchCoaches, fetchCoachById, updateCoach, deleteCoach } from "../../../../api/busCoachApi";

// Định nghĩa kiểu dữ liệu cho xe khách
type Coach = {
  coachId: number;
  coachName: string;
  licensePlateNumberCoach: string;
  url?: string;
};

const BusCoachListPage: React.FC = () => {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingCoach, setEditingCoach] = useState<Coach | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadCoaches();
  }, []);

  // Tải danh sách xe khách từ API
  const loadCoaches = async () => {
    setLoading(true);
    try {
      const data: Coach[] = await fetchCoaches();
      setCoaches(data);
    } catch (error) {
      message.error("Không thể tải danh sách xe khách");
    } finally {
      setLoading(false);
    }
  };

  // Xóa xe khách theo ID
  const handleDelete = async (id: number) => {
    try {
      await deleteCoach(id);
      setCoaches((prev) => prev.filter((coach) => coach.coachId !== id));
      message.success("Đã xóa xe khách thành công!");
    } catch {
      message.error("Xóa xe khách thất bại");
    }
  };

  // Chỉnh sửa xe khách theo ID
  const handleEdit = async (id: number) => {
    try {
      const coachData = await fetchCoachById(id);
      if (!coachData) {
        message.error("Không thể tải thông tin xe khách!");
        return;
      }

      setEditingCoach(coachData);
      setEditModalVisible(true);
      form.setFieldsValue(coachData);
    } catch {
      message.error("Không thể tải thông tin xe khách");
    }
  };

  // Cập nhật thông tin xe khách
  const handleEditOk = async (values: { coachName: string; licensePlateNumberCoach: string }) => {
    if (!editingCoach) {
      message.error("Không thể cập nhật vì dữ liệu xe khách không tồn tại!");
      return;
    }

    try {
      await updateCoach(editingCoach.coachId, values);
      setCoaches((prev) =>
        prev.map((c) => (c.coachId === editingCoach.coachId ? { ...c, ...values } : c))
      );
      setEditModalVisible(false);
      message.success("Cập nhật xe khách thành công!");
    } catch {
      message.error("Cập nhật xe khách thất bại!");
    }
  };

  // Lọc danh sách theo tìm kiếm
  const filteredCoaches = coaches.filter((coach) =>
    [coach.coachName, coach.licensePlateNumberCoach].some((field) =>
      field?.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div>
      <h2>Danh Sách Xe Khách</h2>
      <Input
        placeholder="Tìm kiếm theo tên hoặc biển số..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 16, width: 300 }}
      />
      <Table
        loading={loading}
        dataSource={filteredCoaches}
        rowKey="coachId"
        columns={[
          { title: "ID", dataIndex: "coachId", key: "coachId" },
          { title: "Tên Xe", dataIndex: "coachName", key: "coachName" },
          { title: "Biển Số", dataIndex: "licensePlateNumberCoach", key: "licensePlateNumberCoach" },
          { title: "Hình Ảnh", dataIndex: "url", key: "url", render: (url) => <img src={url} alt="coach" width={50} /> },
          {
            title: "Thao tác",
            key: "action",
            render: (_, record) => (
              <div style={{ display: "flex", gap: 8 }}>
                <Button size="small" onClick={() => handleEdit(record.coachId)}>Sửa</Button>
                <Popconfirm title="Xóa xe khách?" onConfirm={() => handleDelete(record.coachId)} okText="Xóa" cancelText="Hủy">
                  <Button danger size="small">Xóa</Button>
                </Popconfirm>
              </div>
            ),
          },
        ]}
      />

      <Modal
        title="Cập nhật xe khách"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={form} onFinish={handleEditOk} layout="vertical">
          <Form.Item name="coachName" label="Tên xe khách" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="licensePlateNumberCoach" label="Biển số xe" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>Cập nhật</Button>
        </Form>
      </Modal>
      
    </div>
  );
};

export { BusCoachListPage };
