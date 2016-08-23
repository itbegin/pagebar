import React, { PropTypes } from 'react'
import './PagerBar.css'

class PageBar extends React.Component {
  getIndents(indents) {
    return (
      <span>
        {indents}
      </span>
    )
  }

  getPageNumberDom(curPage, index, curb, otherb) {
    return (
      <a
        className={curPage === index ? curb : otherb}
        key={`pagenum${index}`}
        onClick={() => this.handleChange(index, this.props.pageLimit)}
      >{index}
      </a>
    )
  }

  getPageTextDom(to, pages, csName, title) {
    return (
      <a
        className={csName}
        onClick={() => this.handleChange(to, this.props.pageLimit)}
      >
        {title}
      </a>
    )
  }

  getTotalPage = () => {
    const { pageLimit, totalSize } = this.props
    let totalPage = 1
    if (totalSize) totalPage = Math.floor((totalSize - 1) / pageLimit) + 1
    return totalPage
  }

  handleChange = (page, pagesize) => {
    const { curPage, pageLimit } = this.props
    const totalPage = this.getTotalPage()
    if (page < 1 || page > totalPage) {
      return
    }
    const pageSizeNum = Number(pagesize)
    if (page !== curPage || pageSizeNum !== pageLimit) {
      this.props.onChange(page, pageSizeNum)
    }
  }

  /**   total pages less than 6;
  总页数小于6时的情况   **/
  appendTotalLessThan6(curPage, pages, curb, otherb, indents) {
    for (let i = 2; i <= pages; i++) {
      indents.push(this.getPageNumberDom(curPage, i, curb, otherb))
    }
    return this.getIndents(indents)
  }
  /**  total pages greater than 5 and current page is between 1 to 4;
  总页数大于5，当前页位置在1-4之间时的情况  **/
  appendCurPageLessThan5(curPage, pages, curb, otherb, indents) {
    for (let i = 2; i <= 5; i++) {
      indents.push(this.getPageNumberDom(curPage, i, curb, otherb))
    }
    indents.push(<span key="pageellipsisright">…</span>)
    indents.push(this.getPageNumberDom(curPage, pages, curb, otherb))
    return this.getIndents(indents)
  }
  /**  total pages greater than 5 and current page is between (pages-4) to pages;
  总页数大于5，当前页位置在(pages-4)-pages之间时的情况  **/
  appendCurPageGreaterThanPagesReduce4(curPage, pages, curb, otherb, indents) {
    indents.push(<span key="pageellipsisleft">…</span>)
    for (let i = pages - 4; i <= pages; i++) {
      indents.push(this.getPageNumberDom(curPage, i, curb, otherb))
    }
    return this.getIndents(indents)
  }
  /** toal pages greater than 5 and current page is between 5 to (pages-5);
   总页数大于5，当前页的位置在5-(pages-5)之间的情况  **/
  appendCurPageCommon(curPage, pages, curb, otherb, indents) {
    indents.push(<span key="pageellipsisleft">…</span>)
    indents.push(this.getPageNumberDom(curPage, curPage - 1, curb, otherb))
    indents.push(this.getPageNumberDom(curPage, curPage, curb, otherb))
    indents.push(this.getPageNumberDom(curPage, curPage + 1, curb, otherb))
    indents.push(<span key="pageellipsisright">…</span>)
    indents.push(this.getPageNumberDom(curPage, pages, curb, otherb))
    return this.getIndents(indents)
  }


  renderPageLimit() {
    const { pageLimit, languageTitles } = this.props
    return (
      <div className="pagelimit" >
        <label className="labelcss" >{languageTitles.percentpage}
          <select
            value={pageLimit}
            onChange={(e) => this.handleChange(1, e.target.value)}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="1000">1000</option>
          </select>
        </label>
      </div>
    )
  }

  renderPageInfo(start, end, totalSize) {
    const languageTitles = this.props.languageTitles
    let endrow = end
    let startrow = start
    if (end > totalSize) {
      /**   在最后一页时，需要校正  **/
      endrow = totalSize
    }
    if (endrow === 0) {
      startrow = 0
    }
    return (
      <div className="pageinfo" >
      {languageTitles.from} {startrow} {languageTitles.to}{endrow} ，
      {languageTitles.total} {totalSize} {languageTitles.records}
      </div>
    )
  }

  renderPageNum(curPage, pages) {
    if (pages <= 1) return null
    const indents = []
    const otherb = 'paginatebutton'
    const curb = 'paginatebutton current'
    indents.push(this.getPageNumberDom(curPage, 1, curb, otherb))
    /**   总页数数据，少于6页时的pagerBar  **/
    if (pages < 6) {
      return this.appendTotalLessThan6(curPage, pages, curb, otherb, indents)
    }
    /**  以下情况，都是总页数大于5的情况  **/
    /**  当前页的位置在1-4时的情况  **/
    if (curPage < 5) {
      return this.appendCurPageLessThan5(curPage, pages, curb, otherb, indents)
    }
    /**  当前页的益在(pages-4)-pages  **/
    if (curPage > (pages - 4)) {
      return this.appendCurPageGreaterThanPagesReduce4(curPage, pages, curb, otherb, indents)
    }
    return this.appendCurPageCommon(curPage, pages, curb, otherb, indents)
  }


  render() {
    const { curPage, pageLimit, totalSize, languageTitles, showRenderPageLimit } = this.props
    let newCurPage = curPage
    const totalPage = this.getTotalPage()
    if (curPage > totalPage) newCurPage = totalPage
    const start = (newCurPage - 1) * pageLimit + 1
    const end = newCurPage * pageLimit

    const preCsName = (newCurPage === 1) ? 'paginatebutton disabled' : 'paginatebutton'
    const lastCsName = (newCurPage === totalPage) ? 'paginatebutton disabled' : 'paginatebutton'
    const pagebarDom = totalPage < 2 ? null : (
      <div className="ib-dtbl-bottom">
        <div className="pagenate">
          {this.getPageTextDom(1, totalPage, preCsName, languageTitles.first)}
          {this.getPageTextDom(newCurPage - 1, totalPage, preCsName, languageTitles.prev)}
          {this.renderPageNum(newCurPage, totalPage)}
          {this.getPageTextDom(newCurPage + 1, totalPage, lastCsName, languageTitles.next)}
          {this.getPageTextDom(totalPage, totalPage, lastCsName, languageTitles.last)}
        </div>
      </div>
      )
    return (
      <div>
          {this.renderPageInfo(start, end, totalSize)}
          {showRenderPageLimit ? this.renderPageLimit(pageLimit) : null}
          {pagebarDom}
      </div>
    )
  }
}
PageBar.defaultProps = {
  onChange: () => {},
  pageLimit: 10,
  curPage: 1,
  showRenderPageLimit: true,
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
  },
}
PageBar.propTypes = {
  pageLimit: PropTypes.number, /**  initiate records percent page; 初始化每页的记录数  **/
  totalSize: PropTypes.number,  /**  total recoreds;总 elems  **/
  curPage: PropTypes.number,  /**  current Page  **/
  onChange: PropTypes.func,  /**  when switch page or change pageLimit,call this function;
  执行翻页或改变每页记录数时，回调方法  **/
  showRenderPageLimit: PropTypes.bool, /** show or hide RenderPageLimit area **/
  languageTitles: PropTypes.object, /** support your custom language titles **/
}

export default PageBar
