import React from 'react'
import { formatNumber } from '../../utils/helpers/global';
import { AppSummaryCardContainer, AppSummaryCardCount, AppSummaryCardDetailContainer, AppSummaryCardIconContainer, AppSummaryCardTitle } from './AppSummaryCard.styled'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Skeleton, Stack } from '@mui/material';

interface Props {
  cardTitle: string;
  cardCount: number;
  Icon: any;
  isCurrencyIcon?: boolean;
  loading?: boolean;
}

const AppSummaryCard: React.FC<Props> = ({ cardTitle, cardCount, Icon, isCurrencyIcon, loading }) => {
  return (
    <>
    {loading ? (
      <Skeleton variant="rounded" width={180} height={100} />
    ) : (
      <AppSummaryCardContainer>
        <AppSummaryCardIconContainer>
          {Icon && <Icon sx={{color: '#ffffff'}}></Icon>}
        </AppSummaryCardIconContainer>
        <AppSummaryCardDetailContainer>
          <AppSummaryCardTitle>{cardTitle}</AppSummaryCardTitle>
          <AppSummaryCardCount>{isCurrencyIcon && (<CurrencyRupeeIcon sx={{height: '15px', width: '15px'}}/>)}{formatNumber(Number(cardCount))}</AppSummaryCardCount>
        </AppSummaryCardDetailContainer>
      </AppSummaryCardContainer>
    )}
    </>
  )
}

export default AppSummaryCard