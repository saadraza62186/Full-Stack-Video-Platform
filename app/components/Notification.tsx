"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from "lucide-react"

type NotificationType = "success" | "error" | "warning" | "info"

interface NotificationContextType {
  showNotification: (message: string, type: NotificationType) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<
    {
      message: string
      type: NotificationType
      id: number
    }[]
  >([])

  const showNotification = (message: string, type: NotificationType) => {
    const id = Date.now()
    setNotifications((prev) => [...prev, { message, type, id }])

    setTimeout(() => {
      setNotifications((current) => current.filter((notification) => notification.id !== id))
    }, 5000)
  }

  const dismissNotification = (id: number) => {
    setNotifications((current) => current.filter((notification) => notification.id !== id))
  }

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div className="toast toast-bottom toast-end z-[100] gap-2">
        {notifications.map((notification) => (
          <div key={notification.id} className={`alert ${getAlertClass(notification.type)} shadow-lg`} role="alert">
            {getNotificationIcon(notification.type)}
            <span>{notification.message}</span>
            <button
              onClick={() => dismissNotification(notification.id)}
              className="btn btn-ghost btn-xs btn-circle ml-2"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  )
}

function getAlertClass(type: NotificationType): string {
  switch (type) {
    case "success":
      return "alert-success"
    case "error":
      return "alert-error"
    case "warning":
      return "alert-warning"
    case "info":
      return "alert-info"
    default:
      return "alert-info"
  }
}

function getNotificationIcon(type: NotificationType) {
  switch (type) {
    case "success":
      return <CheckCircle className="w-5 h-5" />
    case "error":
      return <AlertCircle className="w-5 h-5" />
    case "warning":
      return <AlertTriangle className="w-5 h-5" />
    case "info":
      return <Info className="w-5 h-5" />
    default:
      return <Info className="w-5 h-5" />
  }
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}
