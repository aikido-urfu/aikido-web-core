import { Button, Input, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { USERS_MOCK } from "../Vote/Vote";
import { ListUser } from "../Vote/ListUser";
import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined } from "@ant-design/icons";

type QuestionType = {
    id: number
}

const Question: React.FC<QuestionType> = ({id}) => {
    return <div style={{
        display: 'flex',
        flexDirection: 'row',
        minHeight: 80,
        backgroundColor: '#FFF',
        alignItems: 'center',
        padding: '0 20px',
        justifyContent: 'space-between',
        borderBottom: '1px solid #DADADA',
        
    }}>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 15,
            alignItems: 'center'
        }}>
            <ArrowUpOutlined />
            <ArrowDownOutlined />
            {id}
            <div>
                <h4>Вопрос</h4>
                <p>описание</p>
            </div>
        </div>
        <DeleteOutlined />
    </div>
}

export const SecondStep: React.FC = () => {
    return <div style={{
        maxHeight: '800px'
    }}>
        <div
            style={{
              height: 60,
              display: 'flex',
              alignItems: 'center',
              color: '#1890FF',
              borderBottom: '1px solid #DADADA',
              borderTop: '1px solid #DADADA',
              padding: '0 20px',

            }}
          >
            <h3>Добавить вопрос +</h3>
        </div>
        {...([1,2,3].map(x => {
            return <Question id={x} />
        }))}

        <div style={{
            display: 'flex',
            flexDirection: 'row'
        }}>
            <Button style={{
                margin: '20px 10px 20px 20px',
                backgroundColor: '#1890FF',
                color: '#FFF'
            }}>Создать</Button>
            <Button style={{
                margin: '20px 10px 20px 20px',
            }}>Назад</Button>
        </div>

    </div>
}