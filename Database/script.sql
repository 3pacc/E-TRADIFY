/*==============================================================*/
/* Nom de SGBD :  Microsoft SQL Server 2008                     */
/* Date de création :  28/03/2024 04:54:33                      */
/*==============================================================*/


if exists (select 1
            from  sysobjects
           where  id = object_id('MARKETDATA')
            and   type = 'U')
   drop table MARKETDATA
go

if exists (select 1
            from  sysobjects
           where  id = object_id('PORTOFOLIO')
            and   type = 'U')
   drop table PORTOFOLIO
go

if exists (select 1
            from  sysobjects
           where  id = object_id('PORTOFOLIOITEM')
            and   type = 'U')
   drop table PORTOFOLIOITEM
go

if exists (select 1
            from  sysobjects
           where  id = object_id('PREDICTIONMODEL')
            and   type = 'U')
   drop table PREDICTIONMODEL
go

if exists (select 1
            from  sysobjects
           where  id = object_id('"TRANSACTION"')
            and   type = 'U')
   drop table "TRANSACTION"
go

if exists (select 1
            from  sysobjects
           where  id = object_id('"USER"')
            and   type = 'U')
   drop table "USER"
go

if exists(select 1 from systypes where name='EMAIL')
   drop type EMAIL
go

if exists(select 1 from systypes where name='PASSWORD')
   execute sp_unbindrule PASSWORD
go

if exists(select 1 from systypes where name='PASSWORD')
   drop type PASSWORD
go

if exists(select 1 from systypes where name='ROLE')
   execute sp_unbindrule ROLE
go

if exists(select 1 from systypes where name='ROLE')
   drop type ROLE
go

if exists(select 1 from systypes where name='SYMBOL')
   execute sp_unbindrule SYMBOL
go

if exists(select 1 from systypes where name='SYMBOL')
   drop type SYMBOL
go

if exists(select 1 from systypes where name='TYPE')
   execute sp_unbindrule TYPE
go

if exists(select 1 from systypes where name='TYPE')
   drop type TYPE
go

if exists (select 1 from sysobjects where id=object_id('R_PASSWORD') and type='R')
   drop rule  R_PASSWORD
go

if exists (select 1 from sysobjects where id=object_id('R_ROLE') and type='R')
   drop rule  R_ROLE
go

if exists (select 1 from sysobjects where id=object_id('R_SYMBOL') and type='R')
   drop rule  R_SYMBOL
go

if exists (select 1 from sysobjects where id=object_id('R_TYPE') and type='R')
   drop rule  R_TYPE
go

create rule R_PASSWORD as
      @column >= '6'
go

create rule R_ROLE as
      @column in ('Administrator','Trader')
go

create rule R_SYMBOL as
      @column in ('BTC')
go

create rule R_TYPE as
      @column in ('Buy','Sell')
go

/*==============================================================*/
/* Domaine : EMAIL                                              */
/*==============================================================*/
create type EMAIL
   from varchar(55)
go

/*==============================================================*/
/* Domaine : PASSWORD                                           */
/*==============================================================*/
create type PASSWORD
   from varchar(30)
go

execute sp_bindrule R_PASSWORD, PASSWORD
go

/*==============================================================*/
/* Domaine : ROLE                                               */
/*==============================================================*/
create type ROLE
   from varchar(55)
go

execute sp_bindrule R_ROLE, ROLE
go

/*==============================================================*/
/* Domaine : SYMBOL                                             */
/*==============================================================*/
create type SYMBOL
   from varchar(50)
go

execute sp_bindrule R_SYMBOL, SYMBOL
go

/*==============================================================*/
/* Domaine : TYPE                                               */
/*==============================================================*/
create type TYPE
   from varchar(20)
go

execute sp_bindrule R_TYPE, TYPE
go

/*==============================================================*/
/* Table : MARKETDATA                                           */
/*==============================================================*/
create table MARKETDATA (
   DATA_ID              int                  not null,
   ITEM_ID              int                  not null,
   MD_SYMBOL            SYMBOL               null,
   OPENPRICE            money                null,
   CLOSEPRICE           money                null,
   HIGHPRICE            money                null,
   LOWPRICE             money                null,
   VOLUME               float(50)            null,
   MD_TIMESTAMP         datetime             null,
   constraint PK_MARKETDATA primary key nonclustered (DATA_ID)
)
go

/*==============================================================*/
/* Table : PORTOFOLIO                                           */
/*==============================================================*/
create table PORTOFOLIO (
   PORTOFOLIO_ID        int                  not null,
   USER_ID              int                  not null,
   NAME                 varchar(30)          null,
   constraint PK_PORTOFOLIO primary key nonclustered (PORTOFOLIO_ID)
)
go

/*==============================================================*/
/* Table : PORTOFOLIOITEM                                       */
/*==============================================================*/
create table PORTOFOLIOITEM (
   ITEM_ID              int                  not null,
   PORTOFOLIO_ID        int                  not null,
   QUANTITY             int                  null,
   PURCHASEPRICE        money                null,
   PURCHASEDATE         money                null,
   PORTTOFOLIO_SYMBOL   SYMBOL               null,
   constraint PK_PORTOFOLIOITEM primary key nonclustered (ITEM_ID)
)
go

/*==============================================================*/
/* Table : PREDICTIONMODEL                                      */
/*==============================================================*/
create table PREDICTIONMODEL (
   MODEL_ID             int                  not null,
   USER_ID              int                  not null,
   MODELNAME            varchar(30)          null,
   DESCRIPTION          varchar(50)          null,
   CREATEDAT            datetime             null,
   constraint PK_PREDICTIONMODEL primary key nonclustered (MODEL_ID)
)
go

/*==============================================================*/
/* Table : "TRANSACTION"                                        */
/*==============================================================*/
create table "TRANSACTION" (
   TRANSACTION_ID       int                  not null,
   PORTOFOLIO_ID        int                  not null,
   ITEM_ID              int                  not null,
   TRANSACTION_TYPE     TYPE                 null,
   TRANSACTION_SYMBOL   SYMBOL               null,
   PRICE                money                null,
   TRANSACTION_TIMESTAMP datetime             null,
   TRANSACTION_QUANTITY int                  null,
   constraint PK_TRANSACTION primary key nonclustered (TRANSACTION_ID)
)
go

/*==============================================================*/
/* Table : "USER"                                               */
/*==============================================================*/
create table "USER" (
   USER_ID              int                  not null,
   USERNAME             varchar(20)          null,
   PASSWORD             PASSWORD             null,
   EMAIL                EMAIL                null,
   ROLE                 ROLE                 null,
   constraint PK_USER primary key nonclustered (USER_ID)
)
go

