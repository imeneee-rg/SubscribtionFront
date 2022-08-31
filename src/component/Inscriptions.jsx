import React, { useEffect, useState ,useRef} from 'react'

import { DeleteOutlined,EditOutlined,CheckCircleOutlined,  CheckOutlined,CloseCircleOutlined,CloseOutlined,PlusOutlined,SearchOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import FormItem from 'antd/es/form/FormItem';
//import { deleteuser, getusers, selectseletestatus, selectusers } from '../../features/users/usersSlice';

import { Divider, Radio, Table,message, Badge,  Button, Tooltip, Form, Input, Select, Modal,Space, Alert} from 'antd';
//import { deleteuser, getusers, selectseletestatus, selectusers } from '../features/users/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import {  clientinscriptions, createinscription, createInscription, datainscriptionchanged, deleteinscription, deleteinscriptionsstatus, getinscriptions, selectinscriptions, updateinscription } from '../features/inscriptions/inscriptionsSlice';
import { selectproducts } from '../features/products/productsSlice';
import { selectusers, updateuser } from '../features/users/usersSlice';
import { selectperiodstatus } from '../features/periods/periodsSlice';
import Highlighter from 'react-highlight-words';
import { getprice, selectpricestatus } from '../features/prices/pricesSlice';
const Inscriptions = () => {


  const [form] = Form.useForm();

  
 


  const { Option } = Select;
  const layout = {
    labelCol: {
      span:6,
    },
    wrapperCol: {
      span: 17,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 10,
      span: 16,
    },
  };

  const inscriptions = useSelector(selectinscriptions);
 
  const deletstatus = useSelector(deleteinscriptionsstatus)
  const UserSolde=useSelector(selectusers)
  
  const product = useSelector(selectproducts)
  const clients=useSelector(selectusers)
  const period=useSelector(selectperiodstatus)
const productPrice=useSelector(selectpricestatus)
  const [displayforms, setdisplayforms] = useState(false);
  
  const [type, settype] = useState('');
  const [price, setprice] = useState('');
  const [periods, setperiods] = useState('');
  const [client,setclient]=useState('')
  const [displayPrice,setDisplayPrice]=useState('10')
  
  const [products, setproducts] = useState('');


  const dispatch = useDispatch()

  useEffect(() => {
    if (deletstatus === 'success') {
        success()
        dispatch(getinscriptions())
        window.location.href = '/inscriptions'

    } else if (deletstatus === 'failure') {
        error()
    }
}, [deletstatus]);


const upadteSolde = (id, value) => {
      
  let data = {
      id: id,
      data: {
          solde: value
      }
  }

  dispatch(updateuser(data))
  
          
  message.success('inscription successfuly add');
  window.location.href = '/inscriptions'

}
  const AddInscription = () => {
  
    let data ={
                    client : client,
                    type : type,
                    periods : periods,
                    products : products,
                    price:productPrice.price
                    
                  }
  //if(UserSolde.solde>productPrice.price)
  //alert( JSON.stringify(clients.length));
  for (let i = 0; i<clients.length; i++)
  {  //alert( JSON.stringify(clients[i]));
    //alert( JSON.stringify(client));
    if(clients[i]._id==client)
        { 
          let x= parseFloat(clients[i].solde);
          let y= parseFloat(productPrice.price);
          //alert( JSON.stringify(x))
          //alert( JSON.stringify(y))
          if(x>=y)
          { let z=x-y
            dispatch(createinscription(data))
            
            
            dispatch(upadteSolde(client,z))
           
          
          }
            else
            {
             
            message.error("insufficient balance, top up your balance")
            }
        }
    
        
  
  }


  }
  

    const success = () => {
        message.success('inscription successfuly deleted');
    };

    const error = () => {
        message.error('inscription deleting the user');
    };

   

   

    useEffect(() => {
      dispatch(getinscriptions())

  }, []);

  const upadte = (inscription, value) => {
    let data = {
        id: inscription._id,
        data: {
            status: value
        }
    }

    dispatch(updateinscription(data))
    window.location.href = '/inscriptions'

}
const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

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
  const [filteredInfo, setFilteredInfo] = useState({});
  

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    
  };

  
    const columns = [
    {
        title: 'Client',
        dataIndex: 'client',
        key: 'client',
        ...getColumnSearchProps('Name'),
        render: (text, record) => (
          <>
              {record.client.email}
             
          </>
          
      ),
  
      },
    
   
      {
        title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => (
              <>
                  {record.status ===1 &&
                      <>

                          <CheckCircleOutlined onClick={() => upadte(record, 0)} style={{ fontSize: "20px", color: "green", marginLeft: "10px", cursor: "pointer" }} />

                      </>
                  }
                             {record.status ===0 &&
                      <>
                          < CloseCircleOutlined onClick={() => upadte(record, 1)} style={{ fontSize: "20px", color: "red", cursor: "pointer" }} />


                      </>
                  }




              </>
          ),
      },

      {
        title: 'type',
            dataIndex: 'type',
            key: 'type',
           
            filters: [
              {
                text: 'gold',
                value: 'gold',
              },
              {
                text: 'premium',
                value: 'premium',
              },
              
            ],
            filteredValue: filteredInfo.type || null,
      onFilter: (value, record) => record.type.includes(value),
      ellipsis: true,
      },
      {
        title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text, record) => (
              <>
                  {record.price}
              </>
          ),
           
            
      },
      {
        title: 'Products',
            dataIndex: 'products',
            key: 'products',
            render: (text, record) => (
              <>
                  {record.products}
              </>
          ),
           
            
      },
      {
        title: 'Created At',
            dataIndex: 'created at',
            key: 'created at',
            render: (text, record) => (
              <>
                  {record.createdAt}
              </>
          ),
           
            
      },

     
      
     

      {
        title: '',
        key: 'delete',
        dataIndex: 'delete',
        render: (text, record) => (
            <>
                    <DeleteOutlined  onClick={() => dispatch(deleteinscription(record._id))[window.location.href = '/inscriptions']} style={{ color: 'red', cursor: 'pointer' }} />

                    {/*<EditOutlined   style={{ color: 'green', cursor: 'pointer' }} />*/}

            </>
           
        ),
    },

   


  
  
    ];

    
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
      const data={product:products,period:periods};
       dispatch(getprice(data));
       
      showPrice();
    },);
    const showPrice = () => {
      if(products!='' && periods !='' && productPrice !=null){

        setDisplayPrice(productPrice.price);
       
      }else{
        setDisplayPrice('0.00');
      }
     
    };
    const handleOnChangePeriode=(e)=>{
setperiods(e);
   }
   const handleOnChangeProduct=(e)=>{
    setproducts(e);
       }


      
    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
        AddInscription()
        
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

   
  
    
    
      const onFinish = (values) => {
        console.log(values);
      };
    
    
   


    return (
      <div className='container' >



      <h2>Inscriptions <Badge count={inscriptions.length} /></h2>

   
      <>
      <Button type="primary" onClick={showModal}>
       Add Inscription
      </Button>
      <Modal title="Add Inscription" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
  
<Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      

<Form.Item  
        name="client"
        label="User Email"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select onChange={(e) => setclient(e)}
          placeholder="Select the user Email"
        
        >
             
            {
                        clients.map((cate, i) => {
                            return (
                                <option value={cate._id}>{cate.name}</option>
                            )
                        })
                    }
         
         
        </Select>
      </Form.Item>



      <Form.Item  
        name="type"
        label="Type"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select onChange={(e) => settype(e)}
          placeholder="Select the type of your subscribe"
        
        >
          <Option value ="gold">Gold</Option>
          <Option value ="premium">Premium</Option>
         
        </Select>
      </Form.Item>


      <Form.Item  
        name="periods"
        label="Period"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select onChange={(e) => handleOnChangePeriode(e)}
          placeholder="Select How you will pay"
        >
          {
                        period.map((catee, i) => {
                            return (
                                <Option value={catee._id}>{catee.name}</Option>
                            )
                        })
                    }
        </Select>
      </Form.Item>

      <Form.Item 
        name="products"
        label="Product Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select onChange={(e) => handleOnChangeProduct(e)}
          placeholder="Select the product"
        
        >
           
           {
                        product.map((cat, i) => {
                            return (
                                <Option value={cat._id}>{cat.name}</Option>
                            )
                        })
                    }
         
        </Select>
      </Form.Item>

      
      <Form.Item {...tailLayout}>
        {/*<Button type="primary"  onClick={() => AddInscription()} >
          Submit
                </Button>*/}
      </Form.Item>
    </Form>
  <>Price : {displayPrice} TND</>
      </Modal>
    </>
           

     
      <Table columns={columns} dataSource={inscriptions} onChange={handleChange} />
  </div>
    )
}

export default Inscriptions