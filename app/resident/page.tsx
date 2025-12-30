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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-4 px-3 sm:py-6 sm:px-4 md:py-8 md:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl border border-blue-100 rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-sm">
          {/* Header with Logo */}
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between mb-6 sm:mb-8 pb-4 border-b border-blue-200">
            <div className="flex items-center gap-3 mb-3 sm:mb-0">
              {/* Logo placeholder - replace with actual logo image when available */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg sm:text-xl">CHR</span>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Cataraqui Heights Residence
              </h2>
            </div>
          </div>

          {/* Resident Photo and Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Resident Photo - Rectangular */}
            <div className="md:col-span-1 flex justify-center md:justify-start">
              <div className="relative w-full max-w-xs sm:max-w-sm md:w-full aspect-[3/4] rounded-xl overflow-hidden border-4 border-blue-400 shadow-xl">
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
            <div className="md:col-span-2 space-y-3 sm:space-y-4">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-1">
                  John Doe
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-blue-600 font-semibold">
                  Room 205
                </p>
              </div>

              {/* Status Badge */}
              <div>
                <span className={`inline-block px-4 py-2 rounded-full text-sm sm:text-base font-semibold shadow-sm ${
                  status === 'in' 
                    ? 'bg-green-100 text-green-700 border-2 border-green-400' 
                    : 'bg-amber-100 text-amber-700 border-2 border-amber-400'
                }`}>
                  {status === 'in' ? '✓ Signed In' : '○ Signed Out'}
                </span>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-3 rounded-xl border border-blue-200 shadow-sm">
                  <p className="text-xs sm:text-sm text-blue-600 font-medium mb-1">Date of Birth</p>
                  <p className="text-sm sm:text-base text-gray-800 font-semibold">January 15, 1945</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-3 rounded-xl border border-blue-200 shadow-sm">
                  <p className="text-xs sm:text-sm text-blue-600 font-medium mb-1">Phone</p>
                  <p className="text-sm sm:text-base text-gray-800 font-semibold">(613) 555-0123</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-3 rounded-xl border border-blue-200 shadow-sm">
                  <p className="text-xs sm:text-sm text-blue-600 font-medium mb-1">Emergency Contact</p>
                  <p className="text-sm sm:text-base text-gray-800 font-semibold">Jane Doe</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-3 rounded-xl border border-blue-200 shadow-sm">
                  <p className="text-xs sm:text-sm text-blue-600 font-medium mb-1">Emergency Phone</p>
                  <p className="text-sm sm:text-base text-gray-800 font-semibold">(613) 555-0124</p>
                </div>
              </div>

              {lastLog && (
                <div className="pt-2">
                  <p className="text-xs sm:text-sm text-blue-600">
                    <span className="font-semibold">Last {lastLog.action === 'in' ? 'signed in' : 'signed out'}:</span> {lastLog.timestamp}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
            <button
              onClick={handleSignIn}
              disabled={status === 'in'}
              className="flex-1 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 active:from-blue-700 active:to-cyan-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg transition-all duration-200 text-base sm:text-lg touch-manipulation transform hover:scale-105 disabled:hover:scale-100"
            >
              Sign In
            </button>
            <button
              onClick={handleSignOut}
              disabled={status === 'out'}
              className="flex-1 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 active:from-blue-700 active:to-cyan-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg transition-all duration-200 text-base sm:text-lg touch-manipulation transform hover:scale-105 disabled:hover:scale-100"
            >
              Sign Out
            </button>
          </div>

          {/* Recent Logs */}
          {logs.length > 0 && (
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-blue-200">
              <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">Recent Activity</h2>
              <div className="space-y-2 max-h-48 sm:max-h-64 overflow-y-auto">
                {logs.slice(-10).reverse().map((log, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 sm:p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 shadow-sm gap-1 sm:gap-0"
                  >
                    <span className={`text-xs sm:text-sm font-medium ${
                      log.action === 'in' ? 'text-green-700' : 'text-amber-700'
                    }`}>
                      {log.action === 'in' ? '✓ Signed In' : '○ Signed Out'}
                    </span>
                    <span className="text-xs text-blue-600">{log.timestamp}</span>
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

