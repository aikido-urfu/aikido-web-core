import React, { useState } from 'react'
import { Tabs, Input, List } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { TabPane } = Tabs
const { Search } = Input

interface Vote {
  id: number
  title: string
  description: string
}

const VotesPage: React.FC = () => {
  const [votes] = useState<Vote[]>([
    { id: 1, title: 'Vote 1', description: 'Description of Vote 1' },
    { id: 2, title: 'Vote 2', description: 'Description of Vote 2' },
    { id: 3, title: 'Vote 3', description: 'Description of Vote 3' },
    { id: 4, title: 'Vote 4', description: 'Description of Vote 4' },
  ])
  const [activeTab, setActiveTab] = useState('all')
  const [searchText, setSearchText] = useState('')

  const handleTabChange = (key: string) => {
    setActiveTab(key)
  }

  const handleSearch = (value: string) => {
    setSearchText(value)
  }

  const filteredVotes = votes.filter((vote) => {
    if (activeTab === 'all') {
      return vote.title.toLowerCase().includes(searchText.toLowerCase())
    } else {
      return (
        vote.title.toLowerCase().includes(searchText.toLowerCase()) &&
        vote.description.toLowerCase().includes(activeTab.toLowerCase())
      )
    }
  })

  return (
    <div style={{ padding: 16 }}>
      <Tabs defaultActiveKey='all' onChange={handleTabChange}>
        <TabPane tab='All' key='all' />
        <TabPane tab='Description1' key='Description1' />
        <TabPane tab='Description2' key='Description2' />
      </Tabs>

      <Search
        placeholder='Search votes'
        prefix={<SearchOutlined />}
        allowClear
        onChange={(e) => handleSearch(e.target.value)}
        style={{ width: 200, margin: '16px 0' }}
      />

      <List
        itemLayout='vertical'
        dataSource={filteredVotes}
        renderItem={(vote) => (
          <List.Item key={vote.id}>
            <Link
              to={`/vote?id=${vote.id}`}
              style={{
                textDecoration: 'none',
                color: 'red',
              }}
            >
              <List.Item.Meta
                title={vote.title}
                description={vote.description}
              />
            </Link>
          </List.Item>
        )}
      />
    </div>
  )
}

export default VotesPage
