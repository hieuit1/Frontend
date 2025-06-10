import React, { useEffect, useState } from "react";
import {
  Table, Tag, Input, Button, Popconfirm, message, Modal, Form, } from "antd";
import {
  fetchUsers,
  deleteUser,
  updateUser,
} from "../../../api/userSignUpsApi";
import { User } from "../../../interfaces/User";

const UserSignUps: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch {
        message.error("Không thể tải danh sách người dùng");
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

const filteredUsers = users.filter((user) =>
  [
    String(user.name || ""),  
    String(user.email || ""),
    String(user.numberphone || ""),
    String(user.role || "")
  ].some((field) => field.toLowerCase().includes(search.toLowerCase()))
);

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((item) => item.id !== id));
      message.success("Đã xóa thành công");
    } catch {
      message.error("Xóa người dùng thất bại");
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setEditModalVisible(true);
  };

  const handleEditOk = async (values: any) => {
    try {
      const updatedUser = await updateUser(editingUser!.id, values);
      setUsers((prev) => prev.map((u) => (u.id === editingUser?.id ? updatedUser : u)));
      setEditModalVisible(false);
      setEditingUser(null);
      message.success("Đã cập nhật thông tin người dùng");
    } catch {
      message.error("Cập nhật thất bại");
    }
  };

  const refreshUsers = async () => {
  setLoading(true);
  try {
    const data = await fetchUsers();
    setUsers(data);
    message.success("Danh sách người dùng đã được cập nhật!");
  } catch {
    message.error("Không thể cập nhật danh sách người dùng.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <h2>Quản lý Người Dùng</h2>
      <Button
  type="primary"
  onClick={refreshUsers}
  style={{ marginBottom: 16 }}
>
  Cập nhật danh sách
</Button>

      <Input
        placeholder="Tìm kiếm theo tên, email, số điện thoại..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: 300, marginBottom: 16 }}
      />
      
      <Table
        loading={loading}
        dataSource={filteredUsers}
        rowKey="id"
        columns={[
          { title: "ID", dataIndex: "id", key: "id" },
          { title: "Tên", dataIndex: "name", key: "name" },
          { title: "Email", dataIndex: "email", key: "email" },
          { title: "Số điện thoại", dataIndex: "numberphone", key: "numberphone" },
          {
            title: "Vai trò",
            dataIndex: "role",
            key: "role",
            render: (role) => <Tag color={role === "ADMIN" ? "red" : "green"}>{role}</Tag>,
          },
          {
            title: "Thao tác",
            key: "action",
            render: (_, record: User) => (
              <div style={{ display: "flex", gap: 8 }}>
                <Button size="small" onClick={() => handleEdit(record)}>Sửa</Button>
                <Popconfirm
                  title="Xóa người dùng này?"
                  onConfirm={() => handleDelete(record.id)}
                  okText="Xóa"
                  cancelText="Hủy"
                >
                  <Button danger size="small">Xóa</Button>
                </Popconfirm>
              </div>
            ),
          },
        ]}
      />

      <Modal
        title="Sửa thông tin"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form initialValues={editingUser || {}} onFinish={handleEditOk} layout="vertical">
          <Form.Item name="name" label="Tên" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="numberphone" label="Số điện thoại" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>Lưu</Button>
        </Form>
      </Modal>
    </div>
  );
};

export { UserSignUps };
