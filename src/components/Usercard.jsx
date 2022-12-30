import React, { useState } from "react";
import "../App.css";
import {
  EditOutlined,
  HeartTwoTone,
  MailOutlined,
  DeleteOutlined,
  PhoneOutlined,
  GlobalOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { Modal, Card, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, updateUser } from "../redux/slice/userSlice";

const Usercard = ({ user, idx }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const users = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    website: user.website,
    id: user.id,
  });
  const InputEvent = (event) => {
    const { name, value } = event.target;
    setUserInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    dispatch(updateUser(userInfo));
    localStorage.setItem("users", JSON.stringify(users));
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal1 = () => {
    setIsModalOpen1(true);
  };
  const handleOk1 = () => {
    dispatch(deleteUser(idx));
    localStorage.setItem("users", JSON.stringify(users));
    setIsModalOpen1(false);
  };
  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };
  return (
    <Card
      style={{
        width: 300,
        margin: "15px 7px",
      }}
      cover={
        <img
          alt="example"
          src={`https://avatars.dicebear.com/v2/avataaars/${user.name}.svg?options[mood][]=happy`}
          style={{
            height: 200,
            backgroundColor: "#e9ecef",
          }}
        />
      }
      actions={[
        favorite ? (
          <HeartFilled
            key="setting"
            style={{
              fontSize: "1.2rem",
              color: "#ff4d4f",
            }}
            onClick={() => setFavorite(!favorite)}
          />
        ) : (
          <HeartTwoTone
            key="setting"
            twoToneColor={"red"}
            style={{
              fontSize: "1.2rem",
            }}
            onClick={() => setFavorite(!favorite)}
          />
        ),
        <EditOutlined
          key="edit"
          style={{
            fontSize: "1.2rem",
          }}
          onClick={showModal}
        />,
        <DeleteOutlined
          key="delete"
          style={{
            fontSize: "1.2rem",
          }}
          onClick={showModal1}
        />,
      ]}
    >
      <div className="card-body">
        <div>
          <h2>{user.name}</h2>
        </div>
        <div className="card-info">
          <MailOutlined
            style={{
              fontSize: "1.1rem",
              marginRight: "1.5rem",
            }}
          />
          {user.email}
        </div>
        <div className="card-info">
          <PhoneOutlined
            style={{
              fontSize: "1.1rem",
              marginRight: "1.5rem",
            }}
          />
          {user.phone}
        </div>
        <div className="card-info">
          <GlobalOutlined
            style={{
              fontSize: "1.1rem",
              marginRight: "1.5rem",
            }}
          />
          http://{user.website}
        </div>
      </div>
      <Modal
        title="Editing User"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="modal-body">
          <div className="modal-info">
            <label htmlFor="name" style={{ marginRight: 20 }}>
              Name:
            </label>
            <Input
              placeholder="Enter Name"
              value={userInfo.name}
              id="name"
              required={true}
              onChange={InputEvent}
              name="name"
            />
          </div>
          <div className="modal-info">
            <label htmlFor="email" style={{ marginRight: 20 }}>
              Email:
            </label>
            <Input
              placeholder="Enter Email"
              value={userInfo.email}
              id="email"
              onChange={InputEvent}
              name="email"
            />
          </div>
          <div className="modal-info">
            <label htmlFor="phone" style={{ marginRight: 20 }}>
              Phone:
            </label>
            <Input
              placeholder="Enter Phone"
              value={userInfo.phone}
              id="phone"
              onChange={InputEvent}
              name="phone"
            />
          </div>
          <div className="modal-info">
            <label htmlFor="website" style={{ marginRight: 10 }}>
              Website:
            </label>
            <Input
              placeholder="Enter Website"
              value={userInfo.website}
              id="website"
              onChange={InputEvent}
              name="website"
            />
          </div>
        </div>
      </Modal>
      <Modal
        title="Deleting User"
        open={isModalOpen1}
        onOk={handleOk1}
        onCancel={handleCancel1}
      >
        <h3> Do you want to delete this user?</h3>
      </Modal>
    </Card>
  );
};

export default Usercard;
