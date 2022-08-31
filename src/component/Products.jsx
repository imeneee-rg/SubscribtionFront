import { Badge, Button, Space, Switch, Table, Tooltip ,Input,Form,Modal} from "antd";
import { useEffect, useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createproduct, getproducts, selectaddstatus, selectproducts, selectstatus,deleteproduct, filterprice } from "../features/products/productsSlice";
import { DeleteOutlined,EditOutlined ,CloseOutlined,PlusOutlined,SearchOutlined } from '@ant-design/icons';
import ProductsItem from "./ProductsItem";
//import ProductItem from "./Productitem";
import Highlighter from 'react-highlight-words';
import{selectperiodstatus,getperiods} from "../features/periods/periodsSlice";
import { periodsapi } from "../features/config/requests";
const Products = () => {
    const products= useSelector(selectstatus);
    const dispatch = useDispatch()
    const [displayform, setdisplayform] = useState(false);
    const [name, setname] = useState('');
   const [quantite, setquantite] = useState('');
   const [price, setprice] = useState('');
   const [description, setdescription] = useState('');
   const [periods, setperiods] = useState([]);

   const period=useSelector(selectperiodstatus);

   const onFinish = (values) => {
    console.log(values);
  };
 
   useEffect(() => {

    dispatch(getproducts())
}, [selectaddstatus])

   const addproducts = () => {
    //alert(JSON.stringify(periods));
    const data = {

   name: name,
   price: price,
   quantite: quantite,
 
   description: description,
   prices:periods
  }
   

    dispatch(createproduct(data))

    setdisplayform(false)
    window.location.href = '/products' 
}

    useEffect(() => {
        dispatch(getproducts())
    }, []);

   
      //const product = useSelector(selectproducts)
     
      
    
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

      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          width: '30%',
          render: (text, record) => (
            <>
                {record.name}
            </>
        ),
        
          ...getColumnSearchProps('name'),
        },
        {
          title: 'Quantite',
          dataIndex: 'quantite',
         
          key: 'quantite',

         		
          ...getColumnSearchProps('quantite'),
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
        ...getColumnSearchProps('price'),
        },
        {
          title: 'description',
          dataIndex: 'description',
          key: 'description',
          render: (text, record) => (
            <>
                {record.description}
            </>
        ),
          
         
        },
        {
          title: '',
          key: 'delete',
          dataIndex: 'delete',
          render: (text, record) => (
              <>
                      <DeleteOutlined  style={{ color: 'red', cursor: 'pointer' }} onClick={() => dispatch(deleteproduct(record._id)) [window.location.href = '/products' ] } />
  
                      <EditOutlined  style={{ color: 'green', cursor: 'pointer' }} />
  
              </>
             
          ),
      },
      ];
      const [isModalVisible, setIsModalVisible] = useState(false);

      const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        addproducts()
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };
  
     
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
      return(

<div className='container'>
<h2> Products <Badge count={products.length} /></h2>
<Button type="primary" onClick={showModal}>
       Add Product
      </Button>
      <Modal title="Add Product" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Form
      name="basic"
      labelCol={{
        span: 7,
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
      <Form.Item value={name} onChange={(e) => setname(e.target.value)}
        label="name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your product name!',
          },
        ]}
      >
        <Input />
      </Form.Item>


     


      <Form.Item  value={quantite} onChange={(e) => setquantite(e.target.value)}
        label="quantite"
        name="quantite"
        rules={[
          {
            required: true,
            message: 'Please input the quantite !',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item  value={price} onChange={(e) => setprice(e.target.value)}
        label="Price"
        name="price"
        rules={[
          {
            required: true,
            message: 'Please input your price!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item  value={description} onChange={(e) => setdescription(e.target.value)}
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      {
                        period.map((per, i) => {
                            return (
                              <Form.Item value={periods}  onChange={(e) => setperiods({...periods,[per.name]:{"id":per._id,"value":e.target.value}})}
                              label= {per.name+" price"}
                              name={per.name}
                              rules={[
                                {
                                  required: true,
                                  message: 'Please input your value!',
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                            )
                        })
                    }

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
<Table columns={columns} dataSource={products} />
</div>

        
      )


 
}

export default Products