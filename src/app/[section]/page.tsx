import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { HomePage } from '@/components/HomePage'
import { isSection, sections } from '@/content/site'

/**
 * /rijlessen, /tarieven, /faq enz. tonen de homepage en scrollen naar dat
 * onderdeel (zie SectionLinkHandler). Voor Google is de homepage het
 * officiële adres, zodat er geen dubbele inhoud ontstaat.
 */
export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(sections).map((section) => ({ section }))
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const { section } = await params
  if (!isSection(section)) return {}
  return { title: sections[section].title, alternates: { canonical: '/' } }
}

export default async function Page({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params
  if (!isSection(section)) notFound()
  return <HomePage />
}
