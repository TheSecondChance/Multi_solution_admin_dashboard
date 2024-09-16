import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import BotLayout from "@/layout/BotLayout"
import { useNavigate, useParams } from "react-router-dom"

import { useTranslation } from "react-i18next"

const Success = () => {
  const { t } = useTranslation()

  const { phone_number } = useParams()

  const navigate = useNavigate()
  const onClick = () => {
    navigate(`/bot/success/invoice/${phone_number}`)
  }
  return (
    <BotLayout>
      <Dialog defaultOpen={true}>
        <DialogContent
          className='sm:max-w-[425px] py-16'
          onInteractOutside={(e) => {
            e.preventDefault()
          }}>
          <DialogHeader className='space-y-4'>
            <div className='flex flex-col items-center justify-center gap-4'>
              <img
                src='/success-icon.svg'
                alt='success icon'
                className='h-20 w-20 '
              />
              <DialogTitle>{t("register_succes")}</DialogTitle>
              <DialogDescription>
                {t("trainee_registeration_success")}
              </DialogDescription>
            </div>
          </DialogHeader>
          <DialogFooter className='flex items-center justify-center'>
            <Button
              type='submit'
              className='w-full bg-[#1E477B] hover:bg-[#1E477B]/85 ring-0 focus-visible:ring-0'
              onClick={onClick}>
              {t("ok")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </BotLayout>
  )
}

export default Success
