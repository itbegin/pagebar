import React from 'react'
import { mount } from 'enzyme'
import PageBar from '../src/PageBar.js'
import assert from 'assert'

describe('PagerBar Test Suit', () => {
  const languageTitles = {
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

  const initPageBar = (pageLimit, totalSize, curPage, showRenderPageLimit) =>
    mount(
      <PageBar
        languageTitles={languageTitles}
        pageLimit={pageLimit}
        totalSize={totalSize}
        curPage={curPage}
        showRenderPageLimit={showRenderPageLimit}
      />
    )

  it('test the init params', () => {
    const wrapper = initPageBar(10, 100, 1, true)
    const select = wrapper.find('select')
    const { pageLimit, totalSize, curPage } = wrapper.props()
    let pageinfo = `${languageTitles.from} ${(curPage - 1) * pageLimit + 1} ${languageTitles.to}`
    pageinfo = `${pageinfo}${curPage * pageLimit} ，${languageTitles.total} ${totalSize} `
    pageinfo = `${pageinfo}${languageTitles.records}`
    assert.equal(select.prop('value'), wrapper.props().pageLimit)
    assert.equal(wrapper.find('.pageinfo').text(), pageinfo)
    const pagenateAWrapper = wrapper.find('.pagenate').find('a')
    assert.equal(pagenateAWrapper.length, 10)
    /** curPage=1 first prev click disabled **/
    assert.equal(pagenateAWrapper.first()
    .html(), `<a class="paginatebutton disabled">${languageTitles.first}</a>`)
    assert.equal(pagenateAWrapper.at(1)
    .html(), `<a class="paginatebutton disabled">${languageTitles.prev}</a>`)
    assert.equal(pagenateAWrapper.at(2)
    .html(), '<a class="paginatebutton current">1</a>')
    assert.equal(pagenateAWrapper.at(3)
    .html(), '<a class="paginatebutton">2</a>')
    assert.equal(pagenateAWrapper.at(4)
    .html(), '<a class="paginatebutton">3</a>')
    assert.equal(pagenateAWrapper.at(5)
    .html(), '<a class="paginatebutton">4</a>')
    assert.equal(pagenateAWrapper.at(6)
    .html(), '<a class="paginatebutton">5</a>')
    assert.equal(pagenateAWrapper.at(7)
    .html(), '<a class="paginatebutton">10</a>')
    assert.equal(pagenateAWrapper.at(8)
    .html(), `<a class="paginatebutton">${languageTitles.next}</a>`)
    assert.equal(pagenateAWrapper.last()
    .html(), `<a class="paginatebutton">${languageTitles.last}</a>`)
  })

  it('test hide showRenderPageLimit', () => {
    const wrapper = initPageBar(20, 100, 1, false)
    assert.equal(wrapper.find('select').length, 0)
  })

  it('test turn to page 1-4', () => {
    const wrapper = initPageBar(10, 100, 1, false)
    /**
    page between 1-4   page number bar
    |first prev 1 2 3 4 5 ... 10 next last|
    <a>.length=10
    **/
    // turn to page 2
    wrapper.instance().handleChange(2, 10)
    wrapper.setProps({ curPage: 2 })
    const pagenateAWrapper = wrapper.find('.pagenate').find('a')
    assert.equal(pagenateAWrapper.length, 10)
    assert.equal(pagenateAWrapper.first()
    .html(), `<a class="paginatebutton">${languageTitles.first}</a>`)
    assert.equal(pagenateAWrapper.at(1)
    .html(), `<a class="paginatebutton">${languageTitles.prev}</a>`)
    assert.equal(pagenateAWrapper.at(2)
    .html(), '<a class="paginatebutton">1</a>')
    assert.equal(pagenateAWrapper.at(3)
    .html(), '<a class="paginatebutton current">2</a>')
    assert.equal(pagenateAWrapper.at(4)
    .html(), '<a class="paginatebutton">3</a>')
    assert.equal(pagenateAWrapper.at(5)
    .html(), '<a class="paginatebutton">4</a>')
    assert.equal(pagenateAWrapper.at(6)
    .html(), '<a class="paginatebutton">5</a>')
    assert.equal(pagenateAWrapper.at(7)
    .html(), '<a class="paginatebutton">10</a>')
    assert.equal(pagenateAWrapper.at(8)
    .html(), `<a class="paginatebutton">${languageTitles.next}</a>`)
    assert.equal(pagenateAWrapper.last()
    .html(), `<a class="paginatebutton">${languageTitles.last}</a>`)
    // turn to page 3
    wrapper.instance().handleChange(3, 10)
    wrapper.setProps({ curPage: 3 })
    assert.equal(pagenateAWrapper.at(3)
    .html(), '<a class="paginatebutton">2</a>')
    // turn to page 4
    assert.equal(pagenateAWrapper.at(4)
    .html(), '<a class="paginatebutton current">3</a>')
    wrapper.instance().handleChange(4, 10)
    wrapper.setProps({ curPage: 4 })
    assert.equal(pagenateAWrapper.at(4)
    .html(), '<a class="paginatebutton">3</a>')
    assert.equal(pagenateAWrapper.at(5)
    .html(), '<a class="paginatebutton current">4</a>')
  })

  it('test turn to page greaterthan 4 and lessthan (totalpage-4)', () => {
    const wrapper = initPageBar(10, 100, 1, false)
    /* page between 5-(totalpage-4)   page number bar like
       |first prev 1 ... 4 5 6 ... 10 next last|
       <a> length =9
    */
    // turn to page 5
    wrapper.instance().handleChange(5, 10)
    wrapper.setProps({ curPage: 5 })
    let pagenateAWrapper = wrapper.find('.pagenate').find('a')
    assert.equal(pagenateAWrapper.length, 9)
    assert.equal(pagenateAWrapper.at(2)
    .html(), '<a class="paginatebutton">1</a>')
    assert.equal(pagenateAWrapper.at(3)
    .html(), '<a class="paginatebutton">4</a>')
    assert.equal(pagenateAWrapper.at(4)
    .html(), '<a class="paginatebutton current">5</a>')
    assert.equal(pagenateAWrapper.at(5)
    .html(), '<a class="paginatebutton">6</a>')
    assert.equal(pagenateAWrapper.at(6)
    .html(), '<a class="paginatebutton">10</a>')
      // turn to page 6
    wrapper.instance().handleChange(6, 10)
    wrapper.setProps({ curPage: 6 })
    pagenateAWrapper = wrapper.find('.pagenate').find('a')
    assert.equal(pagenateAWrapper.length, 9)
    assert.equal(pagenateAWrapper.at(3)
    .html(), '<a class="paginatebutton">5</a>')
    assert.equal(pagenateAWrapper.at(4)
    .html(), '<a class="paginatebutton current">6</a>')
  })

  it('test turn to last 4', () => {
    const wrapper = initPageBar(10, 100, 1, false)
    /** page between (totalpage-4)-totalpage  page number bar like
    |first pre 1... 6 7 8 9 10 next last|
    <a>.length=10
    **/
      // turn to page 7
    wrapper.instance().handleChange(7, 10)
    wrapper.setProps({ curPage: 7 })
    let pagenateAWrapper = wrapper.find('.pagenate').find('a')
    assert.equal(pagenateAWrapper.length, 10)
    assert.equal(pagenateAWrapper.at(3)
    .html(), '<a class="paginatebutton">6</a>')
    assert.equal(pagenateAWrapper.at(4)
    .html(), '<a class="paginatebutton current">7</a>')
      // turn to page 8
    wrapper.instance().handleChange(8, 10)
    wrapper.setProps({ curPage: 8 })
    assert.equal(pagenateAWrapper.at(4)
    .html(), '<a class="paginatebutton">7</a>')
    assert.equal(pagenateAWrapper.at(5)
    .html(), '<a class="paginatebutton current">8</a>')
      // turn to page 9
    wrapper.instance().handleChange(9, 10)
    wrapper.setProps({ curPage: 9 })
    assert.equal(pagenateAWrapper.at(5)
    .html(), '<a class="paginatebutton">8</a>')
    assert.equal(pagenateAWrapper.at(6)
    .html(), '<a class="paginatebutton current">9</a>')
      // turn to page 10
    wrapper.instance().handleChange(10, 10)
    wrapper.setProps({ curPage: 10 })
    pagenateAWrapper = wrapper.find('.pagenate').find('a')
    assert.equal(pagenateAWrapper.at(6)
    .html(), '<a class="paginatebutton">9</a>')
    assert.equal(pagenateAWrapper.at(7)
    .html(), '<a class="paginatebutton current">10</a>')
    /** curPage=totalpage next last click disabled **/
    assert.equal(pagenateAWrapper.at(8)
    .html(), `<a class="paginatebutton disabled">${languageTitles.next}</a>`)
    assert.equal(pagenateAWrapper.last()
    .html(), `<a class="paginatebutton disabled">${languageTitles.last}</a>`)
  })

  it('test change pageLimit', () => {
    const wrapper = initPageBar(10, 100, 1, true)
    const select = wrapper.find('select')
    wrapper.setProps({ pageLimit: 20 })
    select.simulate('change')
    const { pageLimit, totalSize, curPage } = wrapper.props()
    let pageinfo = `${languageTitles.from} ${(curPage - 1) * pageLimit + 1} ${languageTitles.to}`
    pageinfo = `${pageinfo}${curPage * pageLimit} ，${languageTitles.total} ${totalSize} `
    pageinfo = `${pageinfo}${languageTitles.records}`
    assert.equal(wrapper.find('.pageinfo').text(), pageinfo)
    /** totalpage = 100/20=5 page num bar like
      |first prev 1 2 3 4 5 next last |
      <a>.length = 9
     **/
    let pagenateAWrapper = wrapper.find('.pagenate').find('a')
    assert.equal(pagenateAWrapper.length, 9)
    assert.equal(pagenateAWrapper.at(2)
    .html(), '<a class="paginatebutton current">1</a>')
    assert.equal(pagenateAWrapper.at(3)
    .html(), '<a class="paginatebutton">2</a>')
    assert.equal(pagenateAWrapper.at(4)
    .html(), '<a class="paginatebutton">3</a>')
    assert.equal(pagenateAWrapper.at(5)
    .html(), '<a class="paginatebutton">4</a>')
    assert.equal(pagenateAWrapper.at(6)
    .html(), '<a class="paginatebutton">5</a>')
    /** totalpage = 100/50=2 page num bar like
      |first prev 1 2 next last |
      <a>.length = 6
     **/
    wrapper.setProps({ pageLimit: 50 })
    select.simulate('change')
    pagenateAWrapper = wrapper.find('.pagenate').find('a')
    assert.equal(pagenateAWrapper.length, 6)
    assert.equal(pagenateAWrapper.at(2)
    .html(), '<a class="paginatebutton current">1</a>')
    assert.equal(pagenateAWrapper.at(3)
    .html(), '<a class="paginatebutton">2</a>')
    /** totalpage = 100/100=1 page num bar hide
      <a>.length = 0
     **/
    wrapper.setProps({ pageLimit: 100 })
    select.simulate('change')
    pagenateAWrapper = wrapper.find('.pagenate').find('a')
    assert.equal(pagenateAWrapper.length, 0)
  })
})
