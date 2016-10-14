<div class="panel panel-default">
<div class="panel-heading">{{trans('common.title')}}</div>
    <!-- Button trigger modal -->

    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel"> {{trans('project.add_project')}}</h4>
                </div>
                <div class="modal-body">
                    {!! Form::open(['route'=>'project.store','method'=>'post','files'=>'true']) !!}
                    <div class='form-group'>
                        {!! Form::label('name',trans('project.project_name').'：',['class'=>'control-label']) !!}
                        {!! Form::text('name',null,['class'=>'form-control']) !!}
                    </div>
                    <div class='form-group'>
                        {!! Form::label('thumbnail',trans('common.thumbnail').'：',['class'=>'control-label']) !!}
                        {!! Form::file('thumbnail') !!}
                    </div>
                    @include('errors/_error')
                <div class="modal-footer">
                    {!! Form::button(trans('common.close'),['class'=>'btn btn-default','data-dismiss'=>"modal"]) !!}
                    {!! Form::submit(trans('project.create_project'),['class'=>'btn btn-primary']) !!}
                </div>
                {!! Form::close() !!}
            </div>
        </div>
    </div>
</div>
    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
        {{trans('project.add_project')}}
    </button>
</div>
