import { Badge, Button, Form, Input, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import periodsSlice, { createperiods, getperiods, selectperiodstatus } from "../features/periods/periodsSlice"

const Periods = () => {
    const [name, setname] = useState('');
    const periods= useSelector(selectperiodstatus);
    const dispatch = useDispatch()

    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    useEffect(() => {

        dispatch(getperiods())
    }, )

    const onFinish = (values) => {
        console.log(values);
      };
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text, record) => (
            <>
                {record.name}
            </>
        ),
          
        },
        

      ];


      const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      addperiods()
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

   
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };



    const addperiods = () => {
        const data ={
                        name:name,
                        
                      }
         
      
          dispatch(createperiods(data))
          
          window.location.href = '/periods'
      }

      return(
        <div className='container' >
   <h2> Periods <Badge count={periods.length} /></h2>

   <Button type="primary" onClick={showModal}>
       Add Period
      </Button>
      <Modal title="Add Period" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Form
      name="basic"
      labelCol={{
        span: 5,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item  value={name} onChange={(e) => setname(e.target.value)}
        label="name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input the period name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      
    </Form>
      </Modal>
   <Table columns={columns} dataSource={periods} />
   </div>
      )


}

    export default Periods