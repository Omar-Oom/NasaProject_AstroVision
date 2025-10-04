import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './ui/Button';

interface ExoplanetPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
  showingStart: number;
  showingEnd: number;
}

const ExoplanetPagination: React.FC<ExoplanetPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
  showingStart,
  showingEnd,
}) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8"
    >
      {/* Results info */}
      <div className="text-gray-300 text-sm">
        Showing <span className="text-cyan-400 font-medium">{showingStart}</span> to{' '}
        <span className="text-cyan-400 font-medium">{showingEnd}</span> of{' '}
        <span className="text-white font-medium">{totalItems}</span> planets
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        {/* Previous button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {getVisiblePages().map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="px-3 py-2 text-gray-400">...</span>
              ) : (
                <Button
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onPageChange(page as number)}
                  className={`px-3 py-2 min-w-[40px] ${
                    currentPage === page
                      ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                      : 'border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400'
                  }`}
                >
                  {page}
                </Button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Next button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Items per page info */}
      <div className="text-gray-400 text-xs">
        {itemsPerPage} per page
      </div>
    </motion.div>
  );
};

export default ExoplanetPagination;
