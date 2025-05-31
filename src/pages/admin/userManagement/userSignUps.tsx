import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Input,
  Button,
  Popconfirm,
  message,
  Modal,
  Form,
} from "antd";
import {
  fetchUsers,
  deleteUser,
  bulkDeleteUsers,
  updateUser,
  User,
} from "../../../api/userSignUpsApi";

const UserSignUps: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load user data
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
        message.error("Không thể tải người dùng");
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  // Tìm kiếm người dùng
  const filteredUsers = users.filter((u) =>
    [
      u.name,
      u.email,
      u.password || "",
      u.registeredAt,
      u.method || "",
      u.updatedAt || "",
    ].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );

  // Xóa 1 người dùng
  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((item) => item.id !== id));
      message.success("Đã xóa thành công");
    } catch {
      message.error("Xóa người dùng thất bại");
    }
  };

  // Xóa nhiều người dùng
  const handleBulkDelete = async () => {
    try {
      await bulkDeleteUsers(selectedRowKeys as number[]);
      setUsers((prev) =>
        prev.filter((item) => !selectedRowKeys.includes(item.id))
      );
      setSelectedRowKeys([]);
      message.success("Đã xóa các mục đã chọn");
    } catch {
      message.error("Xóa hàng loạt thất bại");
    }
  };

  // Mở modal chỉnh sửa
  const handleEdit = (user: User) => {
    setEditingUser(user);
    setEditModalVisible(true);
  };

  // Cập nhật thông tin người dùng
  const handleEditOk = async (values: any) => {
    try {
      const updatedUser = await updateUser(editingUser!.id, values);
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser?.id ? updatedUser : u))
      );
      setEditModalVisible(false);
      setEditingUser(null);
      message.success("Đã cập nhật thành công");
    } catch {
      message.error("Cập nhật người dùng thất bại");
    }
  };

  return (
    <div>
      <h2>Người Dùng Đăng Ký</h2>

      {error && (
        <div style={{ color: "red", marginBottom: 16 }}>{error}</div>
      )}

      <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
        <Input
          placeholder="Tìm kiếm theo tên, email, mật khẩu, ngày, phương thức..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 300 }}
        />
        <Popconfirm
          title="Bạn có chắc muốn xóa các mục đã chọn?"
          onConfirm={handleBulkDelete}
          okText="Xóa"
          cancelText="Hủy"
          disabled={selectedRowKeys.length === 0}
        >
          <Button danger disabled={selectedRowKeys.length === 0}>
            Xóa các mục đã chọn
          </Button>
        </Popconfirm>
      </div>

      <Table
        loading={loading}
        dataSource={filteredUsers}
        rowKey="id"
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
          selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
          ],
        }}
        columns={[
          { title: "ID", dataIndex: "id", key: "id" },
          { title: "Tên", dataIndex: "name", key: "name" },
          { title: "Email", dataIndex: "email", key: "email" },
          {
            title: "Mật khẩu",
            dataIndex: "password",
            key: "password",
            render: (pw: string) =>
              pw ? pw : <i style={{ color: "#aaa" }}>Google</i>,
          },
          {
            title: "Ngày đăng ký",
            dataIndex: "registeredAt",
            key: "registeredAt",
          },
          {
            title: "Phương thức",
            dataIndex: "method",
            key: "method",
            render: (method) =>
              method === "Google" ? (
                <Tag color="blue">Google</Tag>
              ) : (
                <Tag color="green">Tài khoản</Tag>
              ),
          },
          {
            title: "Ngày sửa",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (updatedAt: string | undefined) =>
              updatedAt ? (
                <span>{updatedAt}</span>
              ) : (
                <span style={{ color: "#aaa" }}>Chưa sửa</span>
              ),
          },
          {
            title: "Thao tác",
            key: "action",
            render: (_: any, record: User) => (
              <div style={{ display: "flex", gap: 8 }}>
                <Button size="small" onClick={() => handleEdit(record)}>
                  Sửa
                </Button>
                <Popconfirm
                  title="Bạn có chắc muốn xóa?"
                  onConfirm={() => handleDelete(record.id)}
                  okText="Xóa"
                  cancelText="Hủy"
                >
                  <Button danger size="small">
                    Xóa
                  </Button>
                </Popconfirm>
              </div>
            ),
          },
        ]}
      />

      <Modal
        title="Sửa thông tin người dùng"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          initialValues={editingUser || {}}
          onFinish={handleEditOk}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true, message: "Vui lòng nhập tên" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Vui lòng nhập email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    editingUser?.method === "Google" ||
                    (typeof value === "string" && value.length > 0)
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Vui lòng nhập mật khẩu");
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Lưu
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export { UserSignUps };
