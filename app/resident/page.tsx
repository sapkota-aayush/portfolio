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
    <div className="min-h-screen bg-[#fefcf9] py-8 px-4 md:py-12 md:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-sm border border-brown-300/40 rounded-sm p-6 md:p-8">
          {/* Resident Photo */}
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-brown-300/40 shadow-md">
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
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-brown-900 mb-2">
              John Doe
            </h1>
            <p className="text-lg md:text-xl text-brown-700 mb-1">
              Room 205
            </p>
            <div className="mt-4">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                status === 'in' 
                  ? 'bg-green-100 text-green-800 border border-green-300' 
                  : 'bg-red-100 text-red-800 border border-red-300'
              }`}>
                {status === 'in' ? '✓ Signed In' : '○ Signed Out'}
              </span>
            </div>
            {lastLog && (
              <p className="text-sm text-brown-600 mt-3">
                Last {lastLog.action === 'in' ? 'signed in' : 'signed out'}: {lastLog.timestamp}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={handleSignIn}
              disabled={status === 'in'}
              className="flex-1 px-6 py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-sm shadow-sm transition-colors duration-200 text-lg"
            >
              Sign In
            </button>
            <button
              onClick={handleSignOut}
              disabled={status === 'out'}
              className="flex-1 px-6 py-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-sm shadow-sm transition-colors duration-200 text-lg"
            >
              Sign Out
            </button>
          </div>

          {/* Recent Logs */}
          {logs.length > 0 && (
            <div className="mt-8 pt-6 border-t border-brown-200">
              <h2 className="text-lg font-bold text-brown-900 mb-4">Recent Activity</h2>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {logs.slice(-10).reverse().map((log, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-brown-50 rounded-sm border border-brown-200/50"
                  >
                    <span className={`text-sm font-medium ${
                      log.action === 'in' ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {log.action === 'in' ? '✓ Signed In' : '○ Signed Out'}
                    </span>
                    <span className="text-xs text-brown-600">{log.timestamp}</span>
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

