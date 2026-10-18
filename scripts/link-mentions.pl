# Usage: perl scripts/link-mentions.pl .        apply scripts/link-mentions.txt
#        perl scripts/link-mentions.pl . dry    only report
# Turns the first unlinked mention of a target phrase in a <p> or <li> inside <main> into a link (every language, own phrase list).
# The visible text never changes: only <a href=".." data-ml> and </a> are inserted. The script checks this and dies otherwise.
# Skips a target if the page already links it inside <main>. At most $MAX new links per page. Rerunnable (old data-ml links are removed first).
# Also rewrites internal links to ".../index.html" to the folder URL ("../../index.html" -> "../../"), so Google stops
# reporting /index.html and /fr/index.html as separate pages next to / and /fr/.
use strict; use warnings; use File::Find;
my($R,$mode)=@ARGV; $mode//='apply'; my $MAX=4; my %P;
find(sub{ return unless $_ eq 'index.html'; my $d=$File::Find::dir; return if $d=~m#\.git|/(src|public|privacy|bedankt|prijsofferte-verzonden|zware-berging|takeldienst-antwerpen)(/|$)#;
  (my $rel=$d)=~s/^\Q$R\E//; $rel="$rel/"; $rel=~s#//#/#g; local $/; open my $f,'<:raw',$_; $P{$rel}=<$f>; },$R);
sub norm{ my($base,$h)=@_; $h=~s/[#?].*//; return undef if $h eq ''; if($h=~m#^https?://#){ return undef unless $h=~s#^https?://(www\.)?(takeldienst-depannage\.com|takeldienstfaster\.be)##; $h||='/'; }
  elsif($h!~m#^/#){ $h=$base.$h; } 1 while $h=~s#/\./#/#; 1 while $h=~s#/[^/]+/\.\./#/#; $h=~s#index\.html$##; $h.='/' unless $h=~m#/$#; $h }
sub rel{ my($from,$to)=@_; my $d=()=$from=~m#[^/]+/#g; ($d? '../'x$d : './').substr($to,1) }
sub text{ my $s=shift; $s=~s/<[^>]+>//g; $s }
my @T; open my $c,'<:raw',"$R/scripts/link-mentions.txt" or die $!;
while(<$c>){ s/\r?\n$//; next if /^\s*(#|$)/; my($l,$t,$ph)=split /\t/; $t="/$l$t" unless $l eq 'nl'; push @T,[$l,$t,[split /\|/,$ph]] }
my($pages,$links,$idx)=(0,0,0); my %per;
for my $p(sort keys %P){ my $h=$P{$p}; my $orig=$h; $h=~s#<a href="[^"]*" data-ml>(.*?)</a>#$1#gs;   # rerunnable
  $idx+=$h=~s#href="((?:\.\./)+)index\.html"#href="$1"#g; $idx+=$h=~s#href="\./index\.html"#href="./"#g;
  my($lang)=$p=~m#^/(en|fr|de|pl|ro)/#; $lang//='nl';
  my($pre,$main,$post)=$h=~m#^(.*?<main\b[^>]*>)(.*)(</main>.*)$#s or next;
  my $before=text($main); my %linked; while($main=~/<a [^>]*href="([^"]+)"/g){ my $u=norm($p,$1); $linked{$u}=1 if defined $u }
  my $n=0; my @made;
  for my $t(grep{$_->[0] eq $lang}@T){ my(undef,$target,$phr)=@$t; last if $n>=$MAX; next if $target eq $p || $linked{$target};
    my $done=0;
    for my $ph(@$phr){ last if $done;
      # walk <p>/<li> blocks; inside each, only text outside <a>…</a>
      $main=~s{(<(p|li)\b[^>]*>)(.*?)(</\2>)}{ my($o,$tag,$in,$e)=($1,$2,$3,$4);
        unless($done){ my @parts=split /(<[^>]+>)/,$in; my $ina=0;
          for my $x(@parts){ if($x=~/^</){ $ina++ if $x=~/^<a\b/i; $ina-- if $x=~m#^</a>#i; next } next if $ina || $done;
            if($x=~s{(?<![\w\-])(\Q$ph\E)(?![\w\-])}{'<a href="'.rel($p,$target).'" data-ml>'.$1.'</a>'}ie){ $done=1 } }
          $in=join '',@parts }
        "$o$in$e" }gse; }
    if($done){ $n++; push @made,$target } }
  die "$p: visible text changed\n" unless text($main) eq $before;
  if($n){ $pages++; $links+=$n; $per{$p}=join ' ',@made }
  $h=$pre.$main.$post;
  if($h ne $orig && $mode ne 'dry'){ (my $f="$R$p")=~s#/$#/index.html#; open my $o,'>:raw',$f or die; print $o $h } }
printf "  %-45s %s\n",$_,$per{$_} for sort keys %per;
printf "%s: %d links on %d pages, %d index.html links cleaned\n",($mode eq 'dry'?'dry run':'written'),$links,$pages,$idx;
