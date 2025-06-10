"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DollarSign, Calendar, TrendingUp } from "lucide-react"

export default function Component() {
  const [dailyEarnings, setDailyEarnings] = useState<string>("")
  const [calculations, setCalculations] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0,
    yearly: 0,
  })

  useEffect(() => {
    const daily = Number.parseFloat(dailyEarnings) || 0
    setCalculations({
      daily: daily,
      weekly: daily * 7,
      monthly: daily * 30.44, // Average days per month
      yearly: daily * 365,
    })
  }, [dailyEarnings])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 pt-8">
          <div className="flex items-center justify-center gap-2">
            <TrendingUp className="h-8 w-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">How Much a Year</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter your daily earnings to see how much you make per week, month, and year
          </p>
        </div>

        {/* Input Section */}
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Daily Earnings
            </CardTitle>
            <CardDescription>How much do you make per day?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="daily-earnings">Amount ($)</Label>
              <Input
                id="daily-earnings"
                type="number"
                placeholder="0.00"
                value={dailyEarnings}
                onChange={(e) => setDailyEarnings(e.target.value)}
                className="text-lg"
                step="0.01"
                min="0"
              />
            </div>
          </CardContent>
        </Card>

        {/* Results Grid */}
        {calculations.daily > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-green-50 border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-green-800 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Daily
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-900">{formatCurrency(calculations.daily)}</div>
                <p className="text-xs text-green-700 mt-1">Per day</p>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-blue-800 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Weekly
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900">{formatCurrency(calculations.weekly)}</div>
                <p className="text-xs text-blue-700 mt-1">Per week (7 days)</p>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-purple-800 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Monthly
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-900">{formatCurrency(calculations.monthly)}</div>
                <p className="text-xs text-purple-700 mt-1">Per month (30.44 days)</p>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 border-orange-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-orange-800 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Yearly
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-900">{formatCurrency(calculations.yearly)}</div>
                <p className="text-xs text-orange-700 mt-1">Per year (365 days)</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Additional Info */}
        {calculations.yearly > 0 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>💡 Quick Facts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Hourly (8 hrs/day):</span>
                  <span className="font-semibold">{formatCurrency(calculations.daily / 8)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Working days (250/year):</span>
                  <span className="font-semibold">{formatCurrency(calculations.daily * 250)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weekdays only:</span>
                  <span className="font-semibold">{formatCurrency(calculations.daily * 5 * 52)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Per minute (8 hrs):</span>
                  <span className="font-semibold">{formatCurrency(calculations.daily / (8 * 60))}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {calculations.daily === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💰</div>
            <p className="text-gray-500 text-lg">Enter your daily earnings above to see the magic happen!</p>
          </div>
        )}
      </div>
    </div>
  )
}
