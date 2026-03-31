import { useState } from "react"
import { invoices, paymentRecords, type Invoice, type PaymentMethod } from "@/data/mock"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import {
  CreditCard, CheckCircle2, AlertTriangle, Clock, ChevronRight,
  Landmark, Smartphone, Circle, ArrowLeft,
} from "lucide-react"

// ─── helpers ──────────────────────────────────────────────────────────────────

function formatEur(amount: number) {
  return `€\u202f${amount.toFixed(2).replace(".", ",")}`
}

const idealBanks = [
  "ABN AMRO", "ING", "Rabobank", "SNS Bank", "ASN Bank", "Bunq", "Knab", "Triodos",
]

const methodMeta: Record<PaymentMethod, { label: string; desc: string; icon: React.ElementType }> = {
  ideal:      { label: "iDEAL",        desc: "Pay instantly via your bank", icon: Landmark },
  card:       { label: "Card",          desc: "Visa · Mastercard · Maestro",  icon: CreditCard },
  apple_pay:  { label: "Apple Pay",     desc: "Pay with Face ID or Touch ID", icon: Smartphone },
  google_pay: { label: "Google Pay",    desc: "Pay with your Google account", icon: Smartphone },
}

const invoiceTypeLabels: Record<string, string> = {
  annual_collection:     "Annual collection fee",
  bulky_waste:           "Bulky waste",
  excess_waste_penalty:  "Excess waste penalty",
  hazardous_disposal:    "Hazardous disposal",
}

const methodLabels: Record<PaymentMethod, string> = {
  ideal:      "iDEAL",
  card:       "Card",
  apple_pay:  "Apple Pay",
  google_pay: "Google Pay",
}

// ─── Payment modal ────────────────────────────────────────────────────────────

type ModalStep = "method" | "details" | "processing" | "success"

interface PaymentModalProps {
  open: boolean
  onClose: () => void
  invoicesToPay: Invoice[]
  onSuccess: (ids: string[]) => void
}

function PaymentModal({ open, onClose, invoicesToPay, onSuccess }: PaymentModalProps) {
  const [step, setStep] = useState<ModalStep>("method")
  const [method, setMethod] = useState<PaymentMethod | null>(null)
  const [bank, setBank] = useState(idealBanks[0])
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")

  const total = invoicesToPay.reduce((s, inv) => s + inv.amount, 0)

  function resetAndClose() {
    setStep("method")
    setMethod(null)
    setCardNumber("")
    setExpiry("")
    setCvv("")
    onClose()
  }

  function handlePay() {
    setStep("processing")
    setTimeout(() => {
      setStep("success")
      onSuccess(invoicesToPay.map((i) => i.id))
    }, 1800)
  }

  function formatCardNumber(raw: string) {
    const digits = raw.replace(/\D/g, "").slice(0, 16)
    return digits.replace(/(.{4})/g, "$1 ").trim()
  }

  function formatExpiry(raw: string) {
    const digits = raw.replace(/\D/g, "").slice(0, 4)
    return digits.length > 2 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits
  }

  const canPayCard = cardNumber.replace(/\s/g, "").length === 16 && expiry.length >= 4 && cvv.length >= 3

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) resetAndClose() }}>
      <DialogContent className="max-w-[380px] p-0 gap-0 rounded-2xl overflow-hidden" aria-describedby="payment-desc">
        {/* Step: method selection */}
        {step === "method" && (
          <>
            <DialogHeader className="px-6 pt-6 pb-4">
              <DialogTitle>Choose payment method</DialogTitle>
            </DialogHeader>
            <p id="payment-desc" className="sr-only">Select how you would like to pay {formatEur(total)}</p>

            {/* Amount summary */}
            <div className="mx-6 mb-5 rounded-xl bg-muted/50 px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {invoicesToPay.length === 1 ? invoicesToPay[0].description : `${invoicesToPay.length} invoices`}
              </span>
              <span className="text-base font-bold text-foreground">{formatEur(total)}</span>
            </div>

            <div className="px-6 pb-6 grid grid-cols-2 gap-3">
              {(Object.keys(methodMeta) as PaymentMethod[]).map((m) => {
                const meta = methodMeta[m]
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setMethod(m)
                      if (m === "apple_pay" || m === "google_pay") {
                        handlePay()
                      } else {
                        setStep("details")
                      }
                    }}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-xl border-2 py-4 px-3 text-center transition-colors",
                      "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring",
                      "hover:border-primary hover:bg-primary/5"
                    )}
                    aria-label={`Pay with ${meta.label}`}
                  >
                    <meta.icon className="w-6 h-6 text-muted-foreground" aria-hidden="true" />
                    <span className="text-sm font-semibold text-foreground">{meta.label}</span>
                    <span className="text-[11px] text-muted-foreground leading-tight">{meta.desc}</span>
                  </button>
                )
              })}
            </div>
          </>
        )}

        {/* Step: details */}
        {step === "details" && method && (
          <>
            <DialogHeader className="px-6 pt-6 pb-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep("method")}
                  aria-label="Back to payment method selection"
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                </button>
                <DialogTitle>{methodMeta[method].label}</DialogTitle>
              </div>
            </DialogHeader>
            <div id="payment-desc" className="sr-only">Enter your payment details to pay {formatEur(total)}</div>

            <div className="px-6 pb-6 space-y-5">
              {/* Amount */}
              <div className="rounded-xl bg-muted/50 px-4 py-3 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total to pay</span>
                <span className="text-base font-bold">{formatEur(total)}</span>
              </div>

              {/* iDEAL — bank selector */}
              {method === "ideal" && (
                <div className="space-y-2">
                  <Label htmlFor="bank-select" className="text-sm font-medium">Select your bank</Label>
                  <select
                    id="bank-select"
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    className={cn(
                      "w-full h-11 rounded-lg border border-input bg-background px-3 text-sm",
                      "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-2"
                    )}
                    aria-label="Choose your bank for iDEAL payment"
                  >
                    {idealBanks.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                  <p className="text-xs text-muted-foreground">
                    You will be redirected to your bank's secure login page.
                  </p>
                </div>
              )}

              {/* Card */}
              {method === "card" && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="card-number">Card number</Label>
                    <Input
                      id="card-number"
                      inputMode="numeric"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      maxLength={19}
                      autoComplete="cc-number"
                      aria-label="Card number"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="expiry">Expiry</Label>
                      <Input
                        id="expiry"
                        inputMode="numeric"
                        placeholder="MM / YY"
                        value={expiry}
                        onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                        maxLength={7}
                        autoComplete="cc-exp"
                        aria-label="Card expiry date"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        inputMode="numeric"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                        maxLength={4}
                        autoComplete="cc-csc"
                        aria-label="Card security code"
                        type="password"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Circle className="w-3 h-3 fill-primary text-primary" aria-hidden="true" />
                    Your card details are encrypted and never stored.
                  </p>
                </div>
              )}

              <Button
                className="w-full"
                size="lg"
                onClick={handlePay}
                disabled={method === "card" && !canPayCard}
                aria-label={`Confirm payment of ${formatEur(total)} with ${methodMeta[method].label}`}
              >
                Pay {formatEur(total)}
              </Button>
            </div>
          </>
        )}

        {/* Step: processing */}
        {step === "processing" && (
          <div className="px-6 py-12 flex flex-col items-center gap-4 text-center" role="status" aria-live="polite">
            <div className="w-14 h-14 rounded-full border-4 border-primary border-t-transparent animate-spin" aria-hidden="true" />
            <p className="text-base font-semibold text-foreground">Processing your payment…</p>
            <p className="text-sm text-muted-foreground">Please wait a moment</p>
          </div>
        )}

        {/* Step: success */}
        {step === "success" && (
          <div className="px-6 py-10 flex flex-col items-center gap-5 text-center" role="status" aria-live="polite">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9 text-primary" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{formatEur(total)} paid</p>
              <p className="text-sm text-muted-foreground mt-1">
                {method ? `via ${methodLabels[method]}` : ""}
                {" · "}{new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
            <div className="w-full rounded-xl border bg-muted/30 divide-y text-left">
              {invoicesToPay.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-foreground">{inv.description}</span>
                  <span className="text-sm font-medium">{formatEur(inv.amount)}</span>
                </div>
              ))}
            </div>
            <Button className="w-full" onClick={resetAndClose} autoFocus>
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Payments() {
  const [paidIds, setPaidIds] = useState<string[]>([])

  // Merge session-paid state onto mock data
  const allInvoices = invoices.map((inv) =>
    paidIds.includes(inv.id) ? { ...inv, status: "paid" as const } : inv
  )

  const outstanding = allInvoices.filter((i) => i.status === "outstanding" || i.status === "overdue")
  const history = allInvoices.filter((i) => i.status === "paid")
  const totalDue = outstanding.reduce((s, i) => s + i.amount, 0)

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedInvoices, setSelectedInvoices] = useState<Invoice[]>([])

  function openPaySingle(inv: Invoice) {
    setSelectedInvoices([inv])
    setModalOpen(true)
  }

  function openPayAll() {
    setSelectedInvoices(outstanding)
    setModalOpen(true)
  }

  function handlePaySuccess(ids: string[]) {
    setPaidIds((prev) => [...new Set([...prev, ...ids])])
    setModalOpen(false)
  }

  const statusBadge = (inv: Invoice) => {
    if (inv.status === "overdue")
      return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Overdue</Badge>
    if (inv.status === "outstanding")
      return <Badge className="bg-amber-50 text-amber-700 border-amber-200">Due {new Date(inv.dueDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</Badge>
    return <Badge className="bg-primary/10 text-primary border-primary/20">Paid</Badge>
  }

  return (
    <div className="px-4 py-5 space-y-6">
      {/* Header summary */}
      <div>
        <h2 className="text-lg font-semibold">Payments</h2>
        <p className="text-sm text-muted-foreground">Verdana · Marie's account</p>
      </div>

      {/* Outstanding balance card */}
      {outstanding.length > 0 ? (
        <Card className={cn(
          "border-2",
          outstanding.some((i) => i.status === "overdue")
            ? "border-destructive/40 bg-destructive/5"
            : "border-amber-300/50 bg-amber-50/50"
        )}>
          <CardContent className="p-5">
            <div className="flex items-start gap-3 mb-4">
              <div className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                outstanding.some((i) => i.status === "overdue") ? "bg-destructive/10" : "bg-amber-100"
              )}>
                {outstanding.some((i) => i.status === "overdue")
                  ? <AlertTriangle className="w-4 h-4 text-destructive" aria-hidden="true" />
                  : <Clock className="w-4 h-4 text-amber-600" aria-hidden="true" />
                }
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {outstanding.some((i) => i.status === "overdue") ? "Overdue balance" : "Outstanding balance"}
                </p>
                <p className="text-2xl font-bold mt-0.5">{formatEur(totalDue)}</p>
              </div>
            </div>
            <Button
              className="w-full"
              size="lg"
              onClick={openPayAll}
              aria-label={`Pay all outstanding invoices: ${formatEur(totalDue)}`}
            >
              Pay {formatEur(totalDue)}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-5 flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-primary shrink-0" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-primary">All paid up 🎉</p>
              <p className="text-xs text-muted-foreground mt-0.5">No outstanding invoices</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Outstanding invoices list */}
      {outstanding.length > 0 && (
        <section aria-label="Outstanding invoices">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3">Outstanding</p>
          <div className="space-y-2">
            {outstanding.map((inv) => (
              <Card key={inv.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground leading-snug">{inv.description}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{invoiceTypeLabels[inv.type]}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-base font-bold">{formatEur(inv.amount)}</p>
                      {statusBadge(inv)}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => openPaySingle(inv)}
                    aria-label={`Pay invoice: ${inv.description} — ${formatEur(inv.amount)}`}
                  >
                    Pay this invoice
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      <Separator />

      {/* Payment history */}
      <section aria-label="Payment history">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3">Payment history</p>
        {history.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No payments yet</p>
        ) : (
          <div className="space-y-0 rounded-xl border overflow-hidden divide-y">
            {/* Session-paid invoices appear first */}
            {[...history].reverse().map((inv) => {
              const rec = paymentRecords.find((r) => r.invoiceId === inv.id)
              const wasPaidThisSession = paidIds.includes(inv.id)
              return (
                <div key={inv.id} className="flex items-center gap-3 px-4 py-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-primary" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground leading-tight truncate">{inv.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {wasPaidThisSession
                        ? "Just now"
                        : rec
                          ? new Date(rec.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
                          : "—"}
                      {rec && !wasPaidThisSession && ` · ${methodLabels[rec.method]}`}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-foreground shrink-0">{formatEur(inv.amount)}</span>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* Help note */}
      <div className="rounded-xl bg-muted/40 border px-4 py-3">
        <p className="text-xs font-semibold text-foreground mb-0.5">Questions about your invoice?</p>
        <p className="text-xs text-muted-foreground">
          Contact the Verdana municipality office at{" "}
          <span className="text-primary font-medium">0800-VERDANA</span> or visit{" "}
          <span className="text-primary font-medium">verdana.gov/waste</span>
        </p>
      </div>

      {/* Payment modal */}
      <PaymentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        invoicesToPay={selectedInvoices}
        onSuccess={handlePaySuccess}
      />
    </div>
  )
}
