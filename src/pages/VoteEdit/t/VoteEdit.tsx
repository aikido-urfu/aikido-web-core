// import { Button, Steps, message, ConfigProvider } from 'antd'
// import React, { useState, useEffect } from 'react'
// import { FirstStepEdit, SecondStepEdit } from '../../pages'
// import { useNavigate, useParams } from 'react-router-dom'
// import { observer } from 'mobx-react-lite'
// import { useEnv } from '../../App'
// import { PostVote } from '../../types/api'
// import { GetVoteById } from '../../types/api'

// const VoteEdit: React.FC = () => {
//   const [selectedVote, setselectedVote] = useState<GetVoteById | undefined>()
//   const [step, setstep] = useState(0)
//   const navigate = useNavigate()
//   const { API, logger } = useEnv()
//   const env = useEnv()
//   const { id } = useParams()
//   const url_id = id || ''

//   const { rootStore } = useEnv()
//   const voteCreate = rootStore.VoteCreate

//   const clearPlaceholders = () => {
//     voteCreate.deleteName()
//     voteCreate.deleteDescription()
//     voteCreate.deleteDate()
//     voteCreate.deleteAnonim()
//     voteCreate.deleteAllUsers()
//     voteCreate.deleteAllQuestions()
//   }

//   const navToVoteHandler = () => {
//     clearPlaceholders()
//     navigate('/vote')
//   }

//   useEffect(() => {
//     env.API.getVotes()
//       .then((res) => {
//         let flag = false
//         res.data.votes.map((value: any) => {
//           if (url_id === String(value.id)) {
//             setselectedVote(value)
//             flag = true
//             return
//           }
//         })
//         if (!flag) {
//           navigate('/vote')
//         }
//       })
//       .catch((err) => {
//         env.logger.error(err)
//       })
//   }, [url_id])

//   const onFInallizeVote = (data: PostVote) => {
//     API.sendEditVote(+url_id, data)
//       .then((res) => {
//         logger.info(res)
//         navigate('/completed', {
//           state: {
//             text: 'Поздравляем! Голосование создано',
//           },
//         })
//       })
//       .catch((err) => {
//         // console.log(err)
//         message.error(err.response.data.message)
//         // logger.error(err)
//       })
//   }

//   return (
//     <ConfigProvider
//       theme={{
//         components: {
//           Steps: {
//             iconSizeSM: 32,
//             titleLineHeight: 24,
//           },
//         },
//       }}
//     >
//       <div
//         //header
//         style={{
//           height: 60,
//           backgroundColor: '#FFF',
//           padding: '6px 30px',
//           display: 'flex',
//           flexDirection: 'row',
//           alignItems: 'center',
//           columnGap: 20,
//         }}
//       >
//         <h3 className='title'>Редактирование голосования</h3>
//         <Button onClick={() => navToVoteHandler()}>Отмена</Button>
//       </div>

//       <div
//         //container
//         style={{
//           width: 'auto',
//           minHeight: '100%',
//           margin: 30,
//           backgroundColor: '#FFF',
//         }}
//       >
//         <div
//           style={{
//             height: 60,
//             borderBottom: '1px solid #DADADA',
//             display: 'flex',
//             flexDirection: 'row',
//             alignItems: 'center',
//             padding: '6px 20px',
//             justifyContent: 'space-between',
//           }}
//         >
//           <h3 className='title'>Основная информация и участники</h3>
//           <div
//             style={{
//               flexBasis: '40%',
//               display: 'flex',
//               flexDirection: 'row',
//               gap: 15,
//               alignItems: 'center',
//             }}
//           >
//             <Steps
//               size='small'
//               current={step}
//               className='steps-title'
//               items={[
//                 {
//                   title: 'Основная информация и участники',
//                 },
//                 {
//                   title: 'Вопросы к голосованию',
//                 },
//               ]}
//             ></Steps>
//           </div>
//         </div>
//         {step === 0 ? (
//           <FirstStepEdit
//             onStepChange={(x) => {
//               setstep(x)
//             }}
//             selectedVote={selectedVote}
//           />
//         ) : step === 1 ? (
//           <SecondStepEdit
//             onFInallizeVote={onFInallizeVote}
//             onStepChange={(x) => setstep(x)}
//             selectedVote={selectedVote}
//           />
//         ) : null}
//       </div>
//     </ConfigProvider>
//   )
// }

// export default observer(VoteEdit)
