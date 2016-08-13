import React from 'react'
import PageBar from '../src/PageBar.js'
class PageBarApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      totalSize: 100,
      curPage: 1,
      pageLimit: 10,
    }
  }
  getPageResultFn = (curPage, pageLimit) => {
    this.setState({
      curPage,
      pageLimit,
    })
  }
  render() {
    const { totalSize, pageLimit, curPage } = this.state
    return (
      <div>
        <PageBar
          totalSize={totalSize}
          pageLimit={pageLimit}
          curPage={curPage}
          onChange={this.getPageResultFn}
        />
      </div>
    )
  }
}

export default PageBarApp
