"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface PaginationProps {
  currentPage: number
  totalPages: number
  pageSize: number
  pageSizeOptions?: number[]
  onPageChange: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  className?: string
  showPageSize?: boolean
  maxVisiblePages?: number
}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      pageSize,
      pageSizeOptions = [10, 20, 50, 100],
      onPageChange,
      onPageSizeChange,
      className,
      showPageSize = true,
      maxVisiblePages = 7,
    },
    ref
  ) => {
    const getPageNumbers = () => {
      const pages: (number | "ellipsis")[] = []

      if (totalPages <= maxVisiblePages) {
        // Show all pages if total is less than max visible
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // Always show first page
        pages.push(1)

        const leftSiblingIndex = Math.max(currentPage - 1, 2)
        const rightSiblingIndex = Math.min(currentPage + 1, totalPages - 1)

        const showLeftEllipsis = leftSiblingIndex > 2
        const showRightEllipsis = rightSiblingIndex < totalPages - 1

        if (!showLeftEllipsis && showRightEllipsis) {
          // Show more pages on the left
          const leftItemCount = 3 + 2
          for (let i = 2; i <= leftItemCount; i++) {
            pages.push(i)
          }
          pages.push("ellipsis")
        } else if (showLeftEllipsis && !showRightEllipsis) {
          // Show more pages on the right
          pages.push("ellipsis")
          const rightItemCount = 3 + 2
          for (let i = totalPages - rightItemCount + 1; i < totalPages; i++) {
            pages.push(i)
          }
        } else {
          // Show ellipsis on both sides
          pages.push("ellipsis")
          for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
            pages.push(i)
          }
          pages.push("ellipsis")
        }

        // Always show last page
        pages.push(totalPages)
      }

      return pages
    }

    const handlePrevious = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1)
      }
    }

    const handleNext = () => {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1)
      }
    }

    const handlePageClick = (page: number) => {
      if (page !== currentPage) {
        onPageChange(page)
      }
    }

    const handlePageSizeChange = (value: string) => {
      if (onPageSizeChange) {
        onPageSizeChange(Number(value))
      }
    }

    const pageNumbers = getPageNumbers()

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col sm:flex-row items-center justify-between gap-4",
          className
        )}
      >
        {/* Page size selector */}
        {showPageSize && onPageSizeChange && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Items per page:</span>
            <Select value={String(pageSize)} onValueChange={handlePageSizeChange}>
              <SelectTrigger className="w-[70px]" aria-label="Select page size">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Pagination controls */}
        <nav
          role="navigation"
          aria-label="Pagination"
          className="flex items-center gap-1"
        >
          {/* Previous button */}
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
            className="h-9 w-9"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Page numbers */}
          <div className="flex items-center gap-1">
            {pageNumbers.map((page, index) => {
              if (page === "ellipsis") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="flex h-9 w-9 items-center justify-center"
                    aria-hidden="true"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </span>
                )
              }

              const isActive = page === currentPage

              return (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  disabled={isActive}
                  aria-label={`Go to page ${page}`}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    buttonVariants({
                      variant: isActive ? "default" : "outline",
                      size: "icon",
                    }),
                    "h-9 w-9",
                    isActive && "pointer-events-none"
                  )}
                >
                  {page}
                </button>
              )
            })}
          </div>

          {/* Next button */}
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
            className="h-9 w-9"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </nav>
      </div>
    )
  }
)
Pagination.displayName = "Pagination"

export { Pagination }
