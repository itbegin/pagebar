# pagebar
  pagebar is a React Component.
  
  ![image](http://resource.itbegin.com/imgs/waennpm/pagebar.png)


## demo

[demo](http://resource.itbegin.com/openprj/pagebar/samples/pagebar.html)


## Documentation

PageBarApp.js

```
import React from 'react'
import PageBar from 'pagebar'
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
```

entry.js

```
import React from 'react'
import { render } from 'react-dom'
import PageBarApp from './PageBarApp.js'

render(<PageBarApp />, document.getElementById('container'))
```

## Props
* pageLimit ,records percent page.default is 10
* totalSize ,total records
* curPage ,current page.init curPage is 1
* onChange ,function turn to current page or change pageLimit
* showRenderPageLimit ,show or hide change pageLimit select.default is true
* languageTitles ,some describe words for page,default language is Chinese.like this:

```
languageTitles: {
    first: '首页',
    prev: '前页',
    next: '后页',
    last: '尾页',
    percentpage: '每页',
    from: '从',
    to: '到',
    total: '共',
    records: '条',
  }
```