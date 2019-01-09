import  React, { Component } from 'react';
import {Form,Modal,Input} from 'antd';

class UserModel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }
    onCancelHandler = ()=> {
        this.setState ({
            visible:false
        });
    }
    
    onShowHandler = ()=> {
        this.setState ({
            visible:true
        });
    }
    onOkHandler = ()=> {
        const { onOk } = this.props;
        this.props.form.validateFields((err, values) => {
            onOk(values);
            this.onCancelHandler();
        });    
    }
 
  render() {
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };
    const FormItem = Form.Item;
    const { name, email, website } = this.props.record;
    const title = this.props.title;
    const { getFieldDecorator } = this.props.form;
    return (
      <span>
          <span onClick={this.onShowHandler}>
              {this.props.children}
          </span>
        <Modal visible={this.state.visible} title={title} onCancel={this.onCancelHandler} onOk={this.onOkHandler}>
            <Form>
                <FormItem {...formItemLayout} label="Name">
                    {
                        getFieldDecorator('name',{
                            initialValue:name
                        })(<Input placeholder="please input Name"></Input>)
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="Email">
                    {
                        getFieldDecorator('email',{
                            initialValue:email
                        })(<Input placeholder="please input Email"></Input>)
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="Website">
                    {
                        getFieldDecorator('website',{
                            initialValue:website
                        })(<Input placeholder="please input Website"></Input>)
                    }
                </FormItem>
            </Form>
        </Modal>
      </span>
    )
   
  }
  
}

export default  Form.create()(UserModel);
