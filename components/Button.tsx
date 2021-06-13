export enum ButtonTypes {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
}

type Props = {
  isDisabled?: boolean
  children: string
  buttonType?: ButtonTypes
  handleButtonClick?: (event: React.MouseEvent<HTMLElement>) => void
}

function Button({
  children,
  isDisabled = false,
  buttonType = ButtonTypes.PRIMARY,
  handleButtonClick,
}: Props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <button
      onClick={handleButtonClick}
      disabled={isDisabled}
      type="button"
      className={classNames(
        buttonType === ButtonTypes.PRIMARY ? 'bg-orange-400' : 'bg-blue-400 hover:bg-blue-500',
        isDisabled ? 'bg-orange-100 cursor-default' : 'hover:bg-orange-500',
        `inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`
      )}
    >
      {children}
    </button>
  )
}

export { Button }
