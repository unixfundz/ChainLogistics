/**
 * Pagination Component Usage Examples
 * 
 * This file demonstrates how to use the Pagination component
 * in different scenarios within the ChainLogistics application.
 */

"use client"

import { useState } from "react"
import { Pagination } from "./pagination"

// Example 1: Basic pagination for product lists
export function ProductListPagination() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const totalPages = 15 // This would come from your API/data

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      pageSize={pageSize}
      onPageChange={setCurrentPage}
      onPageSizeChange={setPageSize}
    />
  )
}

// Example 2: Pagination without page size selector
export function EventHistoryPagination() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 8

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      pageSize={20}
      onPageChange={setCurrentPage}
      showPageSize={false}
    />
  )
}

// Example 3: Pagination with custom page size options
export function CustomPagination() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)
  const totalPages = 50

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      pageSize={pageSize}
      pageSizeOptions={[25, 50, 75, 100]}
      onPageChange={setCurrentPage}
      onPageSizeChange={setPageSize}
      maxVisiblePages={5}
    />
  )
}

// Example 4: Complete implementation with data fetching
export function CompleteExample() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  
  // Mock data - replace with actual API call
  const totalItems = 150
  const totalPages = Math.ceil(totalItems / pageSize)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Fetch new data for the page
    // fetchProducts({ page, pageSize })
  }

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
    setCurrentPage(1) // Reset to first page when page size changes
    // Fetch new data with updated page size
    // fetchProducts({ page: 1, pageSize: newPageSize })
  }

  return (
    <div className="space-y-4">
      {/* Your content here */}
      <div className="grid gap-4">
        {/* Product cards, event cards, etc. */}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  )
}
