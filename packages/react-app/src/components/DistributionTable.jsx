import React, { useContext, useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Table, Input, Button, Popconfirm, Form, Typography } from "antd";
const { Text } = Typography;
import { AddressInput } from "./";
import { utils } from "ethers";
import { TestArbCustomToken } from "arb-ts/dist/lib/abi";
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
  const [editing, setEditing] = useState(false);
  const form = useContext(EditableContext);
  const toggleEdit = () => {
    setEditing(!editing);
    // form.setFieldsValue({
    //   [dataIndex]: record[dataIndex],
    // });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
          {
            validator: (_, value) => {
              if (!value) return Promise.resolve();
              try {
                utils.getAddress(value);
                return Promise.resolve();
              } catch (e) {}
              try {
                utils.parseUnits(value, 18);
                return Promise.resolve();
              } catch (e) {}
              return Promise.reject(new Error("Invalid Data"));
            },
          },
        ]}
      >
        {dataIndex == "address" ? (
          <AddressInput onChange={save} />
        ) : (
          <Input type="number" placeholder="# shares" onPressEnter={save} onBlur={save} />
        )}
      </Form.Item>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class DistributionTable extends React.Component {
  constructor(props) {
    super(props);
    this.setList = props.setList;
    this.columns = [
      {
        title: "Beneficiaries",
        dataIndex: "address",
        width: "50%",
        editable: true,
      },
      {
        title: "Initial Shares",
        dataIndex: "amount",
        editable: true,
        width: "35%",
      },
      {
        title: "",
        dataIndex: "Delete",
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Button onClick={() => this.handleDelete(record.key)}>Remove Row</Button>
          ) : null,
      },
    ];
    this.state = {
      dataSource: [
        {
          key: 0,
          address: "0x0",
          amount: 0,
        },
      ],
      count: 1,
    };
  }

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter(item => item.key !== key),
    });
  };
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      address: ``,
      amount: ``,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };
  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  render() {
    const { dataSource } = this.state;
    this.setList(dataSource);
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: record => {
          return {
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave: this.handleSave,
          };
        },
      };
    });
    return (
      <div style={{ margin: "20px" }}>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          summary={pageData => {
            let totalAmount = 0;
            pageData.forEach(({ address, amount }) => {
              totalAmount += Number(amount);
            });
            return (
              <Table.Summary.Row>
                <Table.Summary.Cell>Total Shares</Table.Summary.Cell>
                <Table.Summary.Cell>
                  <Text>{totalAmount}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                  <Button onClick={this.handleAdd} type="primary">
                    Add a row
                  </Button>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            );
          }}
        />
      </div>
    );
  }
}

export default DistributionTable;
