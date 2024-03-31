// import {
//   ArrowLeftOutlined,
//   FileTextOutlined,
//   MoreOutlined,
//   PaperClipOutlined,
// } from '@ant-design/icons'
// import { Button, Input, Modal, Pagination, Radio, Tag } from 'antd'
// import TextArea from 'antd/es/input/TextArea'
// import React, { useEffect, useState } from 'react'
// import { GetMail, GetUsers, PostMail } from '../../types/api'
// import { SelectUsers } from '../VoteCreate/SelectUsers'
// import { useEnv } from '../../App'
// import { maxString, prettyDate } from '../../api/tools'

// type ReadMessageModalType = {
//   isOpen: boolean
//   close: () => void
//   data: GetMail[0]
// }

// const ReadMessageModal: React.FC<ReadMessageModalType> = ({
//   isOpen,
//   close,
//   data,
// }) => {
//   return (
//     <Modal onCancel={close} open={isOpen} centered width={'80vw'} footer={[]}>
//       <div
//         className='mail-modal'
//         style={{
//           backgroundColor: '#FFF',
//           minHeight: 700,
//         }}
//       >
//         <div
//           style={{
//             height: 800 - 80,
//           }}
//         >
//           <div
//             style={{
//               display: 'flex',
//               gap: 25,
//               padding: '0 25px 0 0',
//               marginBottom: 25,
//             }}
//           >
//             <ArrowLeftOutlined
//               onClick={close}
//               style={{ fontSize: '150%', marginRight: 20 }}
//             />
//             <PaperClipOutlined style={{ fontSize: '150%' }} />
//             <MoreOutlined style={{ fontSize: '150%' }} />
//             <Pagination
//               style={{ marginLeft: 'auto' }}
//               simple
//               defaultCurrent={1}
//               total={50}
//             />
//           </div>
//           <div
//             style={{
//               display: 'flex',
//               gap: 10,
//               marginBottom: 30,
//             }}
//           >
//             <h4>{data.theme}</h4>
//             <Tag style={{ borderRadius: 10 }}>От {prettyDate(data.date)}</Tag>
//           </div>
//           <div
//             className='mail-user'
//             style={{
//               display: 'flex',
//               gap: 10,
//               width: 600,
//             }}
//           >
//             <img
//               src='https://ru-static.z-dn.net/files/d96/ced913ba9fe71679ae395a4be5fac683.jpg'
//               alt='avatar'
//               width={30}
//               height={30}
//             />
//             <div>
//               <p>
//                 {data.user.fullName} | {data.user.email}
//               </p>
//               <p>кому: мне</p>
//             </div>
//             <p style={{ marginLeft: 'auto' }}>{prettyDate(data.date)}</p>
//           </div>
//           <div
//             className='mail-message'
//             style={{
//               width: 600,
//               marginTop: 15,
//               backgroundColor: '#E6F7FF',
//               borderRadius: 15,
//               padding: 15,
//             }}
//           >
//             <p>{data.text}</p>
//             <Tag
//               className='pointer'
//               style={{
//                 borderRadius: 10,
//                 marginTop: 25,
//                 padding: '2px 10px',
//               }}
//             >
//               <FileTextOutlined style={{ marginRight: 5 }} />
//               Отсканированное соглашение.pdf
//             </Tag>
//           </div>
//         </div>

//         <div
//           style={{
//             height: 80,
//             display: 'flex',
//             gap: 20,
//             alignItems: 'end',
//             borderTop: '1px solid #DADADA',
//           }}
//         >
//           <TextArea rows={1} />
//           <p className='pointer' style={{ color: '#1890FF' }}>
//             Прикрепить
//           </p>
//           <Button type='primary'>Отправить</Button>
//         </div>
//       </div>
//     </Modal>
//   )
// }

// type messageType = {
//   title: string
//   description: string
// }

// type SendMessageModalType = {
//   setisShowModal: (val: boolean) => void
//   isShowModal: boolean
//   onMessageSend?: (message: PostMail) => void
// }

// const SendMessageModal: React.FC<SendMessageModalType> = ({
//   setisShowModal,
//   isShowModal,
//   onMessageSend,
// }) => {
//   const [data, setdata] = useState<messageType>({ title: '', description: '' })
//   const [users, setusers] = useState<GetUsers>([])

//   const env = useEnv()
//   const sendMessage = () => {
//     const message = {
//       theme: data.title,
//       receivers: users.map((x) => x.id),
//       text: data.description,
//       photos: [],
//       files: [],
//     }
//     env.API.sendMail(message)
//     onMessageSend && onMessageSend(message)
//     setisShowModal(false)
//   }
//   return (
//     <Modal
//       onCancel={() => setisShowModal(false)}
//       onOk={sendMessage}
//       open={isShowModal}
//       centered
//       title='Новое письмо'
//       width={'80vw'}
//       cancelText='Отмена'
//       okText='Отправить'
//       footer={[]}
//     >
//       <div
//         className='mail-modal'
//         style={{
//           backgroundColor: '#FFF',
//           height: 800,
//           borderTop: '1px solid #DADADA',
//         }}
//       >
//         <div
//           style={{
//             height: 800 - 40,
//           }}
//         >
//           <div
//             style={{
//               display: 'flex',
//               gap: 10,
//               height: 50,
//               borderBottom: '1px solid #DADADA',
//               alignItems: 'center',
//             }}
//           >
//             <p>Тема: </p>
//             <Input
//               value={data.title}
//               onChange={(e) => setdata({ ...data, title: e.target.value })}
//               bordered={false}
//             />
//           </div>
//           <div
//             style={{
//               display: 'flex',
//               gap: 10,
//               height: 50,
//               borderBottom: '1px solid #DADADA',
//               alignItems: 'center',
//               marginBottom: 30,
//             }}
//           >
//             <p>Получатели: </p>
//             <SelectUsers setSelectedUsers={setusers} />
//           </div>

//           <Input.TextArea
//             style={{ resize: 'none' }}
//             placeholder='Введите текст...'
//             rows={26}
//             value={data.description}
//             onChange={(e) => setdata({ ...data, description: e.target.value })}
//           ></Input.TextArea>
//         </div>
//         <div
//           style={{
//             height: 20,
//             display: 'flex',
//             alignItems: 'center',
//             gap: 15,
//             paddingTop: 20,
//             borderTop: '1px solid #DADADA',
//           }}
//         >
//           <Button onClick={sendMessage} type='primary'>
//             Отправить
//           </Button>
//           <PaperClipOutlined className='pointer' style={{ fontSize: '150%' }} />
//         </div>
//       </div>
//     </Modal>
//   )
// }

// export const Mail: React.FC = () => {
//   const [isShowModal, setisShowModal] = useState(false)
//   const [isShowMessage, setisShowMessage] = useState(false)
//   const [mails, setmails] = useState<GetMail>([])
//   const [selectedMail, setselectedMail] = useState<GetMail[0]>()

//   const env = useEnv()
//   const handleReadMail = (selected: GetMail[0]) => {
//     env.API.readMail(selected.id).then(() => {
//       updateMail()
//     })
//     setselectedMail(selected)
//   }
//   const updateMail = () => {
//     env.API.getMail()
//       .then((res) => {
//         setmails(res.data)
//       })
//       .catch((err) => {
//         env.messageApi.error(err)
//       })
//   }
//   useEffect(() => {
//     updateMail()
//   }, [])

//   return (
//     <div>
//       {selectedMail && (
//         <ReadMessageModal
//           close={() => setisShowMessage(false)}
//           isOpen={isShowMessage}
//           data={selectedMail}
//         />
//       )}
//       <SendMessageModal
//         setisShowModal={setisShowModal}
//         isShowModal={isShowModal}
//         onMessageSend={() => updateMail()}
//       />

//       <div
//         className='mail-header'
//         style={{
//           padding: '30px 30px 20px 30px',
//           display: 'flex',
//           flexDirection: 'row',
//           gap: 5,
//         }}
//       >
//         <Button
//           onClick={() => {
//             setisShowModal(true)
//           }}
//           style={{
//             marginRight: 20,
//           }}
//           type='primary'
//         >
//           Написать письмо
//         </Button>
//         <Radio.Group defaultValue='Входящие'>
//           <Radio.Button value='Входящие'>Входящие</Radio.Button>
//           <Radio.Button value='Отправленные'>Отправленные</Radio.Button>
//         </Radio.Group>
//       </div>
//       <div
//         className='mail-container'
//         style={{
//           margin: '0 30px',
//           borderRadius: '15px 15px 0 0',
//           height: 700,
//           backgroundColor: '#FFF',
//           overflowY: 'scroll',
//         }}
//       >
//         {...mails.map((x) => {
//           return (
//             <div
//               onClick={() => {
//                 handleReadMail(x)
//                 setisShowMessage(true)
//               }}
//               className='pointer'
//               style={{
//                 height: 80,
//                 background: x.isReaden ? '#FFF' : 'rgba(24, 144, 255, 0.05)',
//                 display: 'flex',
//                 padding: '0 30px 0 50px',
//                 alignItems: 'center',
//                 borderBottom: '1px solid #DADADA',
//               }}
//             >
//               <img
//                 src='https://ru-static.z-dn.net/files/d96/ced913ba9fe71679ae395a4be5fac683.jpg'
//                 alt='user avatat'
//                 height={30}
//                 width={30}
//               />
//               <div
//                 style={{
//                   margin: '0 10px',
//                   minWidth: 180,
//                 }}
//               >
//                 <h4>{x.user.fullName}</h4>
//                 <p style={{ color: '#949494' }}>{x.user.email}</p>
//               </div>
//               <div
//                 style={{
//                   minWidth: 110,
//                   marginRight: 35,
//                 }}
//               >
//                 <h4>{x.theme}</h4>
//               </div>
//               <div
//                 style={{
//                   marginRight: 100,
//                 }}
//               >
//                 <p>{maxString(x.text, 125)}</p>
//               </div>
//               <div style={{ marginLeft: 'auto', display: 'flex', gap: 15 }}>
//                 <p className='whitespace-nowrap'>{prettyDate(x.date)}</p>
//                 <MoreOutlined style={{ fontSize: '150%' }} />
//               </div>
//             </div>
//           )
//         })}
//       </div>
//       <div
//         className='mail-footer'
//         style={{
//           height: 50,
//           backgroundColor: '#FFF',
//           borderTop: '1px solid #DADADA',
//           margin: '0 30px',
//           borderRadius: '0 0 15px 15px',
//           display: 'flex',
//           alignItems: 'center',
//         }}
//       >
//         <Pagination defaultCurrent={1} total={1} />
//       </div>
//     </div>
//   )
// }
