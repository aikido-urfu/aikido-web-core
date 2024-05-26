// import { Button, DatePicker, Input, Switch } from 'antd'
// import TextArea from 'antd/es/input/TextArea'
// import React, { useCallback, useEffect, useState } from 'react'
// import { observer } from 'mobx-react-lite'
// import { useEnv } from '../../App'
// import { SelectUsers, ListUser, VoteCreate } from '..'
// import { GetUsers } from '../../types/api'
// import dayjs, { Dayjs } from 'dayjs'
// import {
//   FileJpgOutlined,
//   UploadOutlined,
//   DeleteOutlined,
// } from '@ant-design/icons'
// import { AddFiles } from '../../components/AddFiles/AddFiles'
// import { UploadFile } from 'antd'
// import { GetVoteById } from '../../types/api'
// import { useParams } from 'react-router-dom'

// type FirstStepType = {
//   onStepChange: (step: number) => void
//   selectedVote: GetVoteById | undefined
// }

// type Generic = string
// type GenericFn = (value: Dayjs) => string

// export type FormatType =
//   | Generic
//   | GenericFn
//   | Array<Generic | GenericFn>
//   | {
//       format: string
//       type?: 'mask'
//     }

// const FirstStepEdit: React.FC<FirstStepType> = observer(
//   ({ onStepChange, selectedVote }) => {
//     const { rootStore } = useEnv()
//     const voteCreate = rootStore.VoteCreate
//     const [users, setusers] = useState<GetUsers>([])
//     const [fileList, setFileList] = useState<UploadFile[]>([])
//     const [urlList, seturlList] = useState<string[]>([])
//     const [vote, setVote] = useState<any>(selectedVote)
//     const { id } = useParams()
//     const url_id = id || ''

//     useEffect(() => {
//       console.log(vote)
//     })

//     const getStartDate = () => {
//       if (
//         selectedVote?.startDate !== undefined &&
//         selectedVote?.startDate !== null
//       ) {
//         return dayjs(selectedVote?.startDate)
//       } else if (
//         voteCreate.startDate !== undefined &&
//         voteCreate.startDate !== null
//       ) {
//         return dayjs(voteCreate.startDate)
//       } else {
//         return null
//       }
//     }

//     const getEndDate = () => {
//       if (
//         selectedVote?.endDate !== undefined &&
//         selectedVote?.endDate !== null
//       ) {
//         return dayjs(selectedVote?.endDate)
//       } else if (
//         voteCreate.endDate !== undefined &&
//         voteCreate.endDate !== null
//       ) {
//         return dayjs(voteCreate.endDate)
//       } else {
//         return null
//       }
//     }

//     const rangePickerHandler = (val: any) => {
//       if (val?.length != 2) return
//       const [d1, d2] = val
//       setVote({
//         ...selectedVote,
//         startDate: d1!.toISOString(),
//         endDate: d2!.toISOString(),
//       })
//       // voteCreate.setDate(d1!.toISOString(), d2!.toISOString())
//     }

//     const onChangeDescHandler = (e: any) => {
//       voteCreate.setDescription(e.target.value)
//     }

//     return (
//       <>
//         <div
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//           }}
//         >
//           <div
//             style={{
//               borderBottom: '1px solid #DADADA',
//               height: 802,
//               display: 'flex',
//             }}
//           >
//             <div
//               style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 flexBasis: '72%',
//               }}
//             >
//               <div
//                 style={{
//                   display: 'flex',
//                   alignItems: 'end',
//                   gap: 20,
//                   marginBottom: 20,
//                   width: '100%',
//                   padding: '20px 16px 0 20px',
//                 }}
//               >
//                 <div
//                   style={{
//                     flexBasis: '46%',
//                   }}
//                 >
//                   <p
//                     className='small-title light-gray'
//                     style={{ marginBottom: 5 }}
//                   >
//                     Название
//                   </p>
//                   <Input
//                     style={{ minWidth: 100 }}
//                     onChange={(e) => {
//                       setVote({
//                         ...selectedVote,
//                         title: e.target.value,
//                       })
//                     }}
//                     value={vote?.title || voteCreate?.title}
//                   ></Input>
//                 </div>
//                 <div
//                   style={{
//                     flexBasis: '54%',
//                   }}
//                 >
//                   <p
//                     className='small-title light-gray'
//                     style={{ marginBottom: 5 }}
//                   >
//                     Сроки проведения
//                   </p>
//                   <DatePicker.RangePicker
//                     placeholder={['Время начала', 'Время окончания']}
//                     style={{ display: 'flex', minWidth: 150 }}
//                     showTime={{ format: 'HH:mm' }}
//                     format='YYYY-MM-DD HH:mm'
//                     // needConfirm={false}
//                     // defaultValue={[
//                     //   selectedVote?.startDate !== undefined &&
//                     //   selectedVote?.startDate !== null
//                     //     ? dayjs(selectedVote?.startDate)
//                     //     : null,
//                     //   selectedVote?.endDate !== undefined &&
//                     //   selectedVote?.endDate !== null
//                     //     ? dayjs(voteCreate.endDate)
//                     //     : null,
//                     // ]}
//                     onChange={rangePickerHandler}
//                     value={[
//                       voteCreate.startDate !== undefined &&
//                       voteCreate.startDate !== null
//                         ? dayjs(voteCreate.startDate)
//                         : null,
//                       voteCreate.endDate !== undefined &&
//                       voteCreate.endDate !== null
//                         ? dayjs(voteCreate.endDate)
//                         : null,
//                     ]}
//                   />
//                 </div>
//               </div>
//               <div>
//                 <p
//                   className='small-title light-gray'
//                   style={{
//                     marginBottom: 5,
//                     width: '100%',
//                     padding: '0px 0px 0 20px',
//                   }}
//                 >
//                   Описание
//                 </p>
//                 <div
//                   style={{ padding: '0px 16px 0 20px', marginBottom: '20px' }}
//                 >
//                   <TextArea
//                     rows={3}
//                     onChange={(e) => onChangeDescHandler(e)}
//                     value={
//                       voteCreate.description || selectedVote?.description || ''
//                     }
//                     defaultValue={
//                       voteCreate.description || selectedVote?.description || ''
//                     }
//                   ></TextArea>
//                 </div>
//                 <div
//                   className='flex gap-x-[10px]'
//                   style={{ padding: '0px 0px 0 20px' }}
//                 >
//                   <p>Анонимное</p>
//                   <Switch
//                     checked={
//                       voteCreate.isAnonim || selectedVote?.isAnonymous || false
//                     }
//                     onChange={(e) => voteCreate.setAnonim(e)}
//                   ></Switch>
//                 </div>
//                 <div
//                   style={{
//                     margin: '30px 0 20px 0',
//                     display: 'flex',
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     gap: 10,
//                     padding: '0px 0px 0 20px',
//                   }}
//                 >
//                   <h3>Участники</h3>
//                   <p
//                     className='gray'
//                     style={{
//                       color: 'gray',
//                     }}
//                   >
//                     {users.length}
//                   </p>
//                 </div>
//                 <div>
//                   <div
//                     style={{
//                       height: 60,
//                       display: 'flex',
//                       alignItems: 'center',
//                       color: '#1890FF',
//                       borderBottom: '1px solid #DADADA',
//                       borderTop: '1px solid #DADADA',
//                       padding: '0 20px',
//                     }}
//                   >
//                     <SelectUsers setSelectedUsers={setusers} />
//                   </div>
//                 </div>
//                 <div style={{ height: '425px', overflowY: 'scroll' }}>
//                   {...users.map((x: any) => {
//                     return (
//                       <ListUser
//                         name={x.fullName}
//                         role={x.role}
//                         mail={''}
//                         isCanBeDeleted={true}
//                         onDeleteClick={() => {
//                           // onDeleteClick(x.id)
//                         }}
//                       />
//                     )
//                   })}
//                 </div>
//               </div>
//             </div>
//             <div
//               style={{
//                 display: 'flex',
//                 flexBasis: '28%',
//                 width: '100%',
//                 flexDirection: 'column',
//                 borderLeft: '1px solid #DADADA',
//               }}
//             >
//               <div
//                 style={{
//                   borderBottom: '1px solid rgba(218, 218, 218, 1)',
//                   padding: '12px 16px',
//                 }}
//               >
//                 <Button
//                   icon={<UploadOutlined />}
//                   style={{
//                     color: 'rgba(0, 0, 0, 0.88)',
//                     width: 189,
//                     height: 32,
//                   }}
//                   onClick={() => {}}
//                 >
//                   Загрузить документ
//                 </Button>
//                 {/* <AddFiles
//                 urlList={urlList}
//                 seturlList={seturlList}
//                 fileList={fileList}
//                 setFileList={setFileList}
//               /> */}
//               </div>
//               <div className='flex flex-col'>
//                 <div
//                   style={{
//                     display: 'flex',
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                     width: '100%',
//                     height: 68,
//                     padding: '20px',
//                     // outline: 'rgba(0, 0, 0, 0.1) solid 1px',
//                     borderBottom: '1px solid rgba(218, 218, 218, 1)',
//                     alignItems: 'center',
//                   }}
//                 >
//                   <div className='flex items-center'>
//                     <FileJpgOutlined
//                       style={{ marginRight: '10px', fontSize: '24px' }}
//                     />
//                     <span className='span-file'>TitleOfFile.jpg</span>
//                   </div>
//                   <a style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
//                     <DeleteOutlined
//                       style={{ fontSize: '24px' }}
//                       onClick={() => {}}
//                     />
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center', height: 60 }}>
//             <Button
//               style={{
//                 backgroundColor: '#1890FF',
//                 margin: '10px 20px',
//                 color: '#FFF',
//               }}
//               onClick={() => {
//                 onStepChange(1)
//               }}
//             >
//               Перейти далее
//             </Button>
//           </div>
//         </div>
//       </>
//     )
//   },
// )

// export default FirstStepEdit
