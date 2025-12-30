'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface LogEntry {
  action: 'in' | 'out'
  timestamp: string
}

export default function ResidentPage() {
  const [status, setStatus] = useState<'in' | 'out'>('out')
  const [lastLog, setLastLog] = useState<LogEntry | null>(null)
  const [logs, setLogs] = useState<LogEntry[]>([])

  // Load initial status and logs from localStorage
  useEffect(() => {
    const savedStatus = localStorage.getItem('resident-status') as 'in' | 'out' | null
    const savedLogs = localStorage.getItem('resident-logs')
    
    if (savedStatus) {
      setStatus(savedStatus)
    }
    
    if (savedLogs) {
      try {
        const parsedLogs = JSON.parse(savedLogs) as LogEntry[]
        setLogs(parsedLogs)
        if (parsedLogs.length > 0) {
          setLastLog(parsedLogs[parsedLogs.length - 1])
        }
      } catch (e) {
        console.error('Error parsing logs:', e)
      }
    }
  }, [])

  const handleSignIn = () => {
    const timestamp = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
    
    const newLog: LogEntry = { action: 'in', timestamp }
    const updatedLogs = [...logs, newLog]
    
    setStatus('in')
    setLastLog(newLog)
    setLogs(updatedLogs)
    
    localStorage.setItem('resident-status', 'in')
    localStorage.setItem('resident-logs', JSON.stringify(updatedLogs))
  }

  const handleSignOut = () => {
    const timestamp = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
    
    const newLog: LogEntry = { action: 'out', timestamp }
    const updatedLogs = [...logs, newLog]
    
    setStatus('out')
    setLastLog(newLog)
    setLogs(updatedLogs)
    
    localStorage.setItem('resident-status', 'out')
    localStorage.setItem('resident-logs', JSON.stringify(updatedLogs))
  }

  return (
    <div className="min-h-screen bg-red-50 py-4 px-3 sm:py-6 sm:px-4 md:py-8 md:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-md border-2 border-red-200 rounded-lg p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-red-700 mb-1">
              Cataraqui Heights Residence
            </h2>
          </div>

          {/* Resident Photo */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-red-500 shadow-lg">
              <Image
                src="/old man photo.avif"
                alt="Resident Photo"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Resident Details */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-900 mb-2">
              John Doe
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-red-700 mb-3 sm:mb-4">
              Room 205
            </p>
            <div className="mt-3 sm:mt-4">
              <span className={`inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${
                status === 'in' 
                  ? 'bg-red-100 text-red-800 border-2 border-red-400' 
                  : 'bg-red-50 text-red-700 border-2 border-red-300'
              }`}>
                {status === 'in' ? '✓ Signed In' : '○ Signed Out'}
              </span>
            </div>
            {lastLog && (
              <p className="text-xs sm:text-sm text-red-600 mt-2 sm:mt-3 px-2">
                Last {lastLog.action === 'in' ? 'signed in' : 'signed out'}: {lastLog.timestamp}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
            <button
              onClick={handleSignIn}
              disabled={status === 'in'}
              className="flex-1 px-4 py-3 sm:px-6 sm:py-4 bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-sm transition-colors duration-200 text-base sm:text-lg touch-manipulation"
            >
              Sign In
            </button>
            <button
              onClick={handleSignOut}
              disabled={status === 'out'}
              className="flex-1 px-4 py-3 sm:px-6 sm:py-4 bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-sm transition-colors duration-200 text-base sm:text-lg touch-manipulation"
            >
              Sign Out
            </button>
          </div>

          {/* Recent Logs */}
          {logs.length > 0 && (
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t-2 border-red-200">
              <h2 className="text-base sm:text-lg font-bold text-red-900 mb-3 sm:mb-4">Recent Activity</h2>
              <div className="space-y-2 max-h-48 sm:max-h-64 overflow-y-auto">
                {logs.slice(-10).reverse().map((log, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 sm:p-3 bg-red-50 rounded-lg border border-red-200 gap-1 sm:gap-0"
                  >
                    <span className={`text-xs sm:text-sm font-medium ${
                      log.action === 'in' ? 'text-red-800' : 'text-red-600'
                    }`}>
                      {log.action === 'in' ? '✓ Signed In' : '○ Signed Out'}
                    </span>
                    <span className="text-xs text-red-600">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

