'use client'

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Speaker {
  id: string
  name: string
  title: string
  image: string
  bio: string
}

interface AgendaItem {
  time: string
  title: string
  speaker?: string
}

interface Event {
  id: string
  name: string
  description: string
  speakers: Speaker[]
  agenda: AgendaItem[]
}

interface AboutSectionProps {
  event: Event
}

export function AboutSection({ event }: AboutSectionProps) {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* About Event */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              About the Event
            </h2>
            <div className="prose prose-lg max-w-4xl mx-auto text-center">
              <p className="text-xl text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
          
          {/* Speakers Section */}
          {event.speakers.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Featured Speakers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {event.speakers.map((speaker) => (
                  <Card key={speaker.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square relative">
                      <Image
                        src={speaker.image}
                        alt={speaker.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{speaker.name}</h3>
                      <Badge variant="secondary" className="mb-3">
                        {speaker.title}
                      </Badge>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {speaker.bio}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {/* Agenda Section */}
          {event.agenda.length > 0 && (
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Event Agenda
              </h2>
              <div className="max-w-3xl mx-auto">
                <div className="space-y-4">
                  {event.agenda.map((item, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex-shrink-0">
                            <Badge variant="outline" className="text-sm font-mono">
                              {item.time}
                            </Badge>
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-lg font-semibold mb-1">
                              {item.title}
                            </h3>
                            {item.speaker && (
                              <p className="text-muted-foreground text-sm">
                                by {item.speaker}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}