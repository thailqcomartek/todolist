import {
  Button,
  Form,
  Input,
  Layout,
  Menu,
  Modal,
  Space,
  Table,
  Tag,
} from "antd";
import "antd/dist/antd.css";
import React, { useState, useEffect } from "react";
import "./index.css";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
const { Header, Content, Footer } = Layout;

const App = () => {
  const [todoList, setTodoList] = useState([
    { id: uuidv4(), value: { content: "di hoc" }, status: true },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    console.log(todoList);
  }, [todoList]);

  const onFinish = (value) => {
    setTodoList([...todoList, { id: uuidv4(), value, status: false }]);
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const setStatus = (record, index) => {
    let arr = todoList;
    arr[index].status = !arr[index].status;

    setTodoList([...arr]);
  };
  const deleteTodo = (index) => {
    let arr = [...todoList];
    arr.splice(index, 1);
    console.log();
    setTodoList([...arr]);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <>{text}</>,
    },
    {
      title: "Content",
      dataIndex: "value",
      key: "value",
      render: (text) => {
        return <>{text.content}</>;
      },
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        return text === true ? <>đã hoàn thành </> : <>chưa hoàn thành </>;
      },
    },  
    {
      title: "Action",
      key: "action",
      render: (record, a, index, c) => (
        <Space size="middle">
          <Button onClick={() => setStatus(record, index)}>
            Chuyển trạng thái
          </Button>
          <Button onClick={() => deleteTodo(index)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        
      </Header>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <Button type="primary flex justify-end mt-3 mb-3" onClick={showModal}>
          Add
        </Button>
        <Modal
          footer={<></>}
          title="Add To Do"
          visible={isModalVisible}
          onCancel={handleCancel}
        >
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="To do"
              name="content"
              rules={[
                {
                  required: true,
                  message: "Input todo!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Table columns={columns} dataSource={todoList} />
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      ></Footer>
    </Layout>
  );
};

export default App;
