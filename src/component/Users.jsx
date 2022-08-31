import React, { useEffect, useRef, useState } from 'react'

import { DeleteOutlined,EditOutlined ,CloseOutlined,PlusOutlined,DiffOutlined ,SearchOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';

//import { deleteuser, getusers, selectseletestatus, selectusers } from '../../features/users/usersSlice';

import { Divider, Radio, Table,message, Badge, Button, Tooltip, Form, Input, Select, Modal, Checkbox, Alert , Space} from 'antd';
import { createuser, deleteuser, getusers, selectdatachanged, selectdeletestatus, selectseletestatus, selectusers, updateuser } from '../features/users/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { type } from '@testing-library/user-event/dist/type';
import { createinscription,  selectaddinscriptionsstatus } from '../features/inscriptions/inscriptionsSlice';
import { selectproducts } from '../features/products/productsSlice';
import FormItem from 'antd/es/form/FormItem';
import Highlighter from 'react-highlight-words';

const Users = () => {

  const client=useSelector(selectusers)
  const [form] = Form.useForm();

  const [user,setuser]=useState('')

  const onFinish = (values) => {
    console.log(values);
  };

 
 


  const { Option } = Select;
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };



  
  const users = useSelector(selectusers);
  const deletstatus = useSelector(selectdeletestatus)
  const datachanged = useSelector(selectdatachanged)
  const inscriptions=useSelector(selectaddinscriptionsstatus)
  const product = useSelector(selectproducts)
  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(getusers())
}, [datachanged])


  const [displayform, setdisplayform] = useState(false);
  

   const [name, setname] = useState('');
   const [email, setemail] = useState('');
   const [phone, setphone] = useState('');
   const [password, setpassword] = useState('');
   const [id, setid] = useState('');

  const [x,setx]=useState('');
   const [type, settype] = useState('');
   const [price, setprice] = useState('');
   const [periods, setperiods] = useState('');
  
   const [products, setproducts] = useState('');
   const [solde, setsolde] = useState('');

   const [soldes, setsoldes] = useState('');

     // Ajout d'un user
  const adduser = () => {
  const data ={
                  name:name,
                  phone:phone,
                  solde:solde,
                  email: email,
                 
                  password: password
                }
   

    dispatch(createuser(data))
    setdisplayform(false)
    window.location.href = '/users'
}



  

    const success = () => {
        message.success('user successfuly deleted');
    };

    const error = () => {
        message.error('error deleting the user');
    };


    const upadte = (id, value) => {
      
      let data = {
          id: id,
          data: {
              solde: value
          }
      }
  
      dispatch(updateuser(data))
      //window.location.href = '/users'

  }
   

    useEffect(() => {
      if (deletstatus === 'success') {
          success()
          dispatch(getusers())
          window.location.href = '/users'

      } else if (deletstatus === 'failure') {
          error()
      }
  }, [deletstatus]);

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const showModalL = (value) => {
    setid(value);
    setVisible(true);
    
  };

  const handleOkk = () => {
     dispatch(upadte(id,soldes))
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancell = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };


  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        ...getColumnSearchProps('name'),
      },
      {
        title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email'),
      },

      {
        title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            render: (text, record) => (
              <>
                  {record.phone}
              </>
          ),
            
      },

      {
        title: 'Wallet',
            dataIndex: 'wallets',
            key: 'solde',
            render: (text, record) => (
              <>
                  {record.solde+"TND"}
        
              </>
          ),
      },
      
     

      {
        title: '',
        key: 'delete',
        dataIndex: 'delete',
        
        render: (text, record) => (
          
            <>
            
            
                    <DeleteOutlined onClick={() => dispatch(deleteuser(record._id)) [window.location.href = '/users' ] } style={{ color: 'red', cursor: 'pointer' }} />

                    <EditOutlined type="primary" onClick={()=>showModalL(record._id) } />
       
                   
       <Modal  
                  
                  
         title="Update Solde"
         visible={visible}
         onOk={handleOkk}
         confirmLoading={confirmLoading}
         onCancel={handleCancell}
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
       onFinishFailed={onFinishFailed}
       autoComplete="off"
     >
       <Form.Item value={soldes} onChange={(e) => setsoldes(e.target.value)}
         label="Wallet"
         name="solde"
         rules={[
          {
            required: true,
            message: 'Please input your wallet!',
          },
        ]}
       >
         <Input />
       </Form.Item>
      
       </Form>
 
       </Modal>
                    
              
                   
                    
                                  

            </>
           
        ),
    },

  
    
  
    ];

    
    
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
      }),
    };

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      adduser()
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

   
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    return (
      <div className='container' >
      <h2>Users <Badge count={users.length} /></h2>





           
         
                 <>
      <Button type="primary" onClick={showModal}>
       Add User
      </Button>
      <Modal title="Add User" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>


      <Form.Item value={solde} onChange={(e) => setsolde(e.target.value)}
        label="wallet"
        name="wallet"
        rules={[
          {
            required: true,
            message: 'Please input your wallet!',
          },
        ]}
      >
        <Input />
      </Form.Item>


      <Form.Item  value={phone} onChange={(e) => setphone(e.target.value)}
        label="phone"
        name="phone"
        rules={[
          {
            required: true,
            message: 'Please input your phone!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item  value={email} onChange={(e) => setemail(e.target.value)}
        label="Email"
        name="Email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item value={password} onChange={(e) => setpassword(e.target.value)}
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

     {/*

      <Form.Item
        wrapperCol={{
          offset: 10,
          span: 16,
        }}
      >
        <Button type="primary" onClick={() => adduser()}>
         Submit
        </Button>
      </Form.Item>*/}
    </Form>
      </Modal>
    </>
                
           




           



           



      <Table columns={columns} dataSource={users} />
  </div>
    )
}

export default Users